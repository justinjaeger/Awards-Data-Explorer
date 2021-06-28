import db from "../lib/db";
import jwt from "jsonwebtoken";

export type IVerifyTokenResponse = {
    status: 'verified' | 'update' | 'delete' | 'error';
    message?: string;
    data?: {
        userId?: number;
        updatedAccessToken?: string;
    };
}

export default async (accessToken: string): Promise<IVerifyTokenResponse> => {

    try {
        // Get the expiration and userId from the token / JWT
        const jwtData = await jwt.verify(
            accessToken, 
            process.env.ACCESS_TOKEN_SECRET,
            { ignoreExpiration: true }, // options
        );
        if (jwtData.error) throw new Error(jwtData.error);
        const { userId, exp: expiration } = jwtData;

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

            console.log("TOKEN EXPIRED");

            // DELETE TOKEN FROM DB
            const deleteTokenResponse = await db.query(`
                DELETE FROM tokens
                WHERE accessToken='${accessToken}' 
            `);
            if (deleteTokenResponse.error) throw new Error(deleteTokenResponse.error);
            
            console.log("token deleted from db");

            // IF NO TOKEN DELETED, DELETE ALL TOKENS ASSOCIATED WITH USER
            if (deleteTokenResponse.affectedRows === 0) {
                console.log("deleting all user tokens");
                const deleteAllTokensResponse = await db.query(`
                    DELETE FROM tokens
                    WHERE userId=${userId}`
                );
                if (deleteAllTokensResponse.error) throw new Error(deleteAllTokensResponse.error);
                return {
                    status: 'delete',
                };
            };

            // CREATE ACCESS TOKEN
            const updatedAccessToken = jwt.sign(
                { userId },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10m' }
            );

            // SAVE TOKEN IN DB
            const saveTokenResponse = await db.query(`
                INSERT INTO tokens(accessToken, userId)
                VALUES('${updatedAccessToken}', ${userId}) 
            `);
            if (saveTokenResponse.error) throw new Error(saveTokenResponse.error);

            // UPDATE LAST LOGGED IN
            const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
            const lastLoggedInResponse = await db.query(`
                UPDATE users
                SET lastLoggedIn = '${datetime}'
                WHERE userId = ${userId} 
            `);
            if (lastLoggedInResponse.error) throw new Error(lastLoggedInResponse.error);

            // Set new cookie in browser
            return {
                status: 'update',
                data: {
                    userId,
                    updatedAccessToken,
                }
            };
        };
        return {
            status: 'verified',
            data: { userId },
        };
    } catch(e) {
        console.log("error in verifyToken: ", e.message);
        return {
            status: 'error',
            message: e.message,
        };
    }
};
