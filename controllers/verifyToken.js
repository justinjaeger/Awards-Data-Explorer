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
         * Get the expiration and user_id from the token / JWT
         */
        let result = await jwt.verify(
            accessToken, 
            process.env.ACCESS_TOKEN_SECRET,
            { ignoreExpiration: true }, // options
        );
        if (result.error) throw new Error(result.error);
        const { user_id, exp: expiration } = result;

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
                WHERE access_token='${accessToken}' 
            `);
            if (deleteTokenResult.error) throw new Error(deleteTokenResult.error);
            
            console.log("token deleted from db");

            // IF NO TOKEN DELETED, DELETE ALL TOKENS ASSOCIATED WITH USER
            if (deleteTokenResult.affectedRows === 0) {
                console.log("deleting all user tokens");
                await db.query(`
                    DELETE FROM tokens
                    WHERE user_id=${user_id}`
                );
                return {
                    tokenAction: 'delete',
                };
            };

            // CREATE ACCESS TOKEN
            const newAccessToken = jwt.sign(
                { user_id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10m' }
            );

            // SAVE TOKEN IN DB
            await db.query(`
                INSERT INTO tokens(access_token, user_id)
                VALUES('${newAccessToken}', ${user_id}) 
            `);

            // UPDATE LAST LOGGED IN
            const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
            await db.query(`
                UPDATE users
                SET lastLoggedIn = '${datetime}'
                WHERE user_id = ${user_id} 
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
