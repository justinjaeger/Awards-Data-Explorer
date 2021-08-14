import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

export type IVerifyTokenResponse = {
    status: 'verified' | 'update' | 'delete' | 'error';
    message?: string;
    data?: {
        id?: number;
        updatedAccessToken?: string;
    };
};

export default async (accessToken: string): Promise<IVerifyTokenResponse> => {
    try {
        // Get the expiration and userId from the token / JWT
        const jwtData = await jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET,
            { ignoreExpiration: true } // options
        );
        if (jwtData.error) throw new Error(jwtData.error);
        const { id, exp: expiration } = jwtData;

        /**
         * If token is expired, delete access token from database.
         * If no rows were affected when deleting token,
         * it means our access token was already used.
         * We then delete all user tokens, assuming a hacker
         * used this token.
         * Otherwise, no hacker found. refresh the token
         */

        // CHECK IF TOKEN EXPIRED
        const currentTime = Math.ceil(Date.now() / 1000);
        if (currentTime - expiration > 0) {
            console.log('TOKEN EXPIRED');

            // DELETE TOKEN FROM DB
            const deleteRes = await prisma.token.delete({
                where: {
                    accessToken,
                },
                select: {
                    accessToken: true,
                },
            });

            console.log('token deleted from db');

            // IF NO TOKEN DELETED, DELETE ALL TOKENS ASSOCIATED WITH USER
            if (!deleteRes.accessToken) {
                console.log('deleting all user tokens');

                await prisma.token.deleteMany({
                    where: {
                        userId: id,
                    },
                });

                return {
                    status: 'delete',
                };
            }

            // CREATE ACCESS TOKEN
            const updatedAccessToken = jwt.sign(
                { id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10m' }
            );

            // SAVE TOKEN IN DB
            await prisma.token.create({
                data: {
                    userId: id,
                    accessToken: updatedAccessToken,
                },
            });

            // UPDATE LAST LOGGED IN
            const datetime = new Date()
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ');
            await prisma.user.update({
                where: {
                    id,
                },
                data: {
                    lastLoggedIn: datetime,
                },
            });

            // Set new cookie in browser
            return {
                status: 'update',
                data: {
                    id,
                    updatedAccessToken,
                },
            };
        }
        return {
            status: 'verified',
            data: { id },
        };
    } catch (e) {
        console.log('error in verifyToken: ', e.message);
        return {
            status: 'error',
            message: e.message,
        };
    }
};
