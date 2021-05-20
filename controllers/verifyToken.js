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

    let result;

    try {
        /**
         * Get the expiration and userId from the token / JWT
         */
        result = await jwt.verify(
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
            result = await db.query(`
                DELETE FROM tokens
                WHERE accessToken='${accessToken}' 
            `);
            if (result.error) throw new Error(result.error);
            
            console.log("token deleted from db");

            // IF NO TOKEN DELETED, DELETE ALL TOKENS ASSOCIATED WITH USER
            if (result.affectedRows === 0) {
                console.log("deleting all user tokens");
                result = await db.query(`
                    DELETE FROM tokens
                    WHERE userId=${userId}`
                );
                if (result.error) throw new Error(result.error);
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
            result = await db.query(`
                INSERT INTO tokens(accessToken, userId)
                VALUES('${newAccessToken}', ${userId}) 
            `);
            if (result.error) throw new Error(result.error);

            // UPDATE LAST LOGGED IN
            const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
            result = await db.query(`
                UPDATE users
                SET lastLoggedIn = '${datetime}'
                WHERE userId = ${userId} 
            `);
            if (result.error) throw new Error(result.error);

            // Set new cookie in browser
            return {
                userId,
                tokenAction: 'update',
                accessToken: newAccessToken,
            };
        };
        return {
            tokenAction: 'none'
        }
    } catch(e) {
        console.log("error in verifyToken: ", e.message);
        return res.status(500).send(e.message);
    }
};
