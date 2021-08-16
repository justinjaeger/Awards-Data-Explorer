import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { IApiResponse, IUser } from '../../../types';
import prisma from '../../../lib/prisma';

interface ILoginResponse extends IApiResponse {
    user?: IUser;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ILoginResponse>
) => {
    const cookies = new Cookies(req, res);

    const {
        method,
        cookies: { accessToken },
        body: { emailOrUsername, password },
    } = req;

    try {
        // POST: login
        if (method === 'POST') {
            const entryType = emailOrUsername.includes('@')
                ? 'email'
                : 'username';

            // Get data based on emailOrUsername entry
            const userResult = await prisma.user.findUnique({
                where: {
                    [entryType]: emailOrUsername,
                },
            });

            // If user not found, send back message
            if (!userResult) {
                return res.json({
                    status: 'rejected',
                    message: `Credentials do not match`,
                });
            }

            const {
                id,
                username,
                email,
                role,
                image,
                password: hashedPassword,
                authenticated,
            } = userResult;

            // Verify password with bcrypt
            const passCheck = await bcrypt.compare(password, hashedPassword);
            // If it returns false, set error on client
            if (passCheck === false) {
                return res.json({
                    status: 'rejected',
                    message: `Credentials do not match`,
                });
            }

            // Check if authenticated
            if (!authenticated) {
                console.log('not authenticated');
                return res.json({
                    status: 'rejected',
                    message: `Please verify the email sent to ${email}.`,
                });
            }

            // CREATE ACCESS TOKEN
            const accessToken = jwt.sign(
                { id }, // payload
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10m' } // options
            );

            // SAVE TOKEN IN DB
            await prisma.token.create({
                data: {
                    accessToken,
                    userId: id,
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
            cookies.set('accessToken', accessToken, { httpOnly: true });

            return res.status(200).json({
                status: 'success',
                user: {
                    id,
                    email,
                    username,
                    role,
                    image,
                },
            });
        }

        // DELETE: logout
        if (method === 'DELETE') {
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

                // First, get the userId from accessToken
                const { accessToken } = req.cookies;
                const tokenRes = await jwt.verify(
                    accessToken,
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        ignoreExpiration: true,
                    }
                );
                const { id } = tokenRes;

                // Second, delete all user tokens
                await prisma.token.deleteMany({
                    where: {
                        userId: id,
                    },
                });
            }

            return res.status(200).json({
                status: 'success',
            });
        }
    } catch (e) {
        console.log('error: ', e.code, e.message);
        return res.status(500).json({
            status: 'error',
            message: e.message,
        });
    }
};
