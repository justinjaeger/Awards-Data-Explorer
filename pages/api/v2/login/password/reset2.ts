import prisma from '../../../../../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import Cookies from 'cookies';
import { ILoginResponse } from '../../../../../types/responses';

/**
 * User has clicked the link in their email to reset password
 * and submitted new password
 * This checks password, updates it, and logs the user in
 */

export default async (req, res): Promise<ILoginResponse> => {

    const {
        method,
        body: { userId, password, confirmPassword },
    } = req;

    const cookies = new Cookies(req, res);
    
    try {
        // POST: update info for user and verify account
        if (method === 'POST') {
            // Check that passwords match
            if (password !== confirmPassword) {
                return res.json({ status: 'rejected', message: 'Passwords do not match.' });
            }
            // Check that password is proper length
            if (password.length < 8) {
                return res.json({ status: 'rejected', message: 'Password must be more than 8 characters.' });
            }
            if (password.length > 20) {
                return res.json({ status: 'rejected', message: 'Password must be less than 20 characters.' });
            }

            // Hash password using bcrypt
            const hashedPassword = await bcrypt.hash(password, 8);
            if (hashedPassword.error) throw new Error(hashedPassword.error);

            // Get the datetime
            const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');

            // Update password in db
            const newUserRes = await db.query(`
                INSERT INTO users(password, lastLoggedIn)
                VALUES('${hashedPassword}', '${datetime}') 
            `);
            if (newUserRes.error) throw new Error(newUserRes.error);

            // Create access token
            const accessToken = jwt.sign(
                { userId }, // payload
                process.env.ACCESS_TOKEN_SECRET, // secret
                { expiresIn: '10m' } // options
            );

            // Save token in db
            const saveTokenRes = await db.query(`
                INSERT INTO tokens(accessToken, userId)
                VALUES('${accessToken}', ${userId}) 
            `);
            if (saveTokenRes.error) throw new Error(saveTokenRes.error);

            // Set new cookie in browser
            cookies.set('accessToken', accessToken, { httpOnly: true });

            // Get remaining user info for login
            const getUserInfo = await db.query(`
                SELECT username, email, admin
                FROM users
                WHERE userId=${userId}
            `);
            if (getUserInfo.error) throw new Error(getUserInfo.error);
            const { username, email, admin } = getUserInfo[0];

            return res.status(200).send({
                status: 'success',
                user: {
                    userId,
                    username,
                    email,
                    admin,
                }
            });
        };

    } catch(e) {
        console.log('error: ', e.message);
        return res.status(500).json({ 
            status: 'error', 
            message: e.message,
        });
    }
};
