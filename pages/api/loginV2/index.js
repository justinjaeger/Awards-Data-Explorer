import db from '../../../lib/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Cookies from 'cookies';

export default async (req, res) => {

    let result;

    const cookies = new Cookies(req, res);

    const {
        method,
        query: { },
        cookies: { accessToken },
        body: { emailOrUsername, password },
    } = req;
    
    try {
        // POST: login
        if (method === 'POST') {

            const entryType = emailOrUsername.includes('@') ? 'email' : 'username';

            // Get data based on emailOrUsername entry
            result = await db.query(`
                SELECT userId, username, email, admin, image, password
                FROM users
                WHERE ${entryType}='${emailOrUsername}'
            `)
            if (result.error) throw new Error(result.error);
            if (result[0] === undefined) {
                return res.json({ 
                    status: 'rejected', 
                    message: `Credentials do not match` 
                });
            }
            const { 
                userId,
                username, 
                email, 
                admin, 
                image, 
                password: hashedPassword 
            } = result[0];
            const authenticated = result[0].authenticated[0];

            // Verify password with bcrypt
            result = await bcrypt.compare(password, hashedPassword);
            // If it returns false, set error on client
            if (result === false) {
                return res.json({ 
                    status: 'rejected', 
                    message: `Credentials do not match` 
                });
            }

            // Check if authenticated
            if (authenticated === 0) {
                console.log('not authenticated');
                return res.json({
                    status: 'rejected',
                    message: `Please verify the email sent to ${email}.`,
                });
            }

            // CREATE ACCESS TOKEN
            const accessToken = jwt.sign(
                { userId }, // payload
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10m' } // ptions
            );

            // SAVE TOKEN IN DB
            result = await db.query(`
                INSERT INTO tokens(accessToken, userId)
                VALUES('${accessToken}', ${userId}) 
            `);
            if (result.error) throw new Error(result.error);

            // UPDATE LAST LOGGED IN
            const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
            result = await db.query(`
                UPDATE users
                SET lastLoggedIn = '${datetime}'
                WHERE userId = ${userId} 
            `);
            if (result.error) throw new Error(result.error);

            // Set new cookie in browser
            cookies.set('accessToken', accessToken, { httpOnly: true });

            return res.status(200).json({
                status: 'success',
                user: {
                    userId,
                    username,
                    email,
                    image,
                    admin,
                }
            })
        };

        // DELETE: logout
        if (method === 'DELETE') {
            // DELETE TOKEN FROM DB
            result = await db.query(`
                DELETE FROM tokens
                WHERE accessToken='${accessToken}' 
            `);
            if (result.error) throw new Error(result.error);
            
            console.log('token deleted from db');

            // IF NO TOKEN DELETED, DELETE ALL TOKENS ASSOCIATED WITH USER
            if (result.affectedRows === 0) {
                console.log('deleting all user tokens');

                // First, get the userId from accessToken
                const { accessToken } = req.cookies;
                result = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, {
                    ignoreExpiration: true,
                });
                const { userId } = result;

                // Second, delete all user tokens
                result = await db.query(`
                    DELETE FROM tokens
                    WHERE userId=${userId}`
                );
                if (result.error) throw new Error(result.error);
            };

            return res.status(200).json({ status: 'success' });
        };

    } catch(e) {
        console.log('error: ', e.message);
        return res.status(500).json({ 
            status: 'error',
            message: e.message
        });
    }
};