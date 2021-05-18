import db from "../lib/db";
import jwt from "jsonwebtoken";

/**
 * Verifies the access token
 * 
 * Return object is tokenAction, which is either:
 * - delete
 * - update
 * - none
 * 
 * Then wherever this is called, it will set or delete 
 * a cookie or do nothing
 */

export default async (accessToken) => {

    try {
        /**
         * Get the expiration and userId from the token / JWT
         */
        let result = await jwt.verify(
            accessToken, 
            process.env.ACCESS_TOKEN_SECRET,
            { ignoreExpiration: true }, // options
        );
        if (result.error) throw new Error(result.error);
        const { userId, exp: expiration } = result;

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
            let deleteTokenResult = await db.query(`
                DELETE FROM tokens
                WHERE accessToken='${accessToken}' 
            `);
            if (deleteTokenResult.error) throw new Error(deleteTokenResult.error);
            
            console.log("token deleted from db");

            // IF NO TOKEN DELETED, DELETE ALL TOKENS ASSOCIATED WITH USER
            if (deleteTokenResult.affectedRows === 0) {
                console.log("deleting all user tokens");
                await db.query(`
                    DELETE FROM tokens
                    WHERE userId=${userId}`
                );
                return {
                    tokenAction: 'delete',
                };
            };

            // CREATE ACCESS TOKEN
            const newAccessToken = jwt.sign(
                { userId },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10m' }
            );

            // SAVE TOKEN IN DB
            await db.query(`
                INSERT INTO tokens(accessToken, userId)
                VALUES('${newAccessToken}', ${userId}) 
            `);

            // UPDATE LAST LOGGED IN
            const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
            await db.query(`
                UPDATE users
                SET lastLoggedIn = '${datetime}'
                WHERE userId = ${userId} 
            `);

            // Set new cookie in browser
            return {
                tokenAction: 'update',
                accessToken: newAccessToken,
            };
        };
        return {
            tokenAction: 'none'
        }
    } catch(err) {
        console.log('error in verifyToken', err)
    };
};
