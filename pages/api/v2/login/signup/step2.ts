import db from '../../../../../lib/db';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import Cookies from 'cookies';
import profanityFilter from '../../../../../utils/profanityFilter';
import usernameFilter from '../../../../../utils/usernameFilter';
import { ILoginResponse } from '../../../../../types/responses';

/**
 * User has already been partially created (see step1.ts)
 * User has just submitted SignUp info (username, password)
 * This checks their username + password, sets them, and validates the account
 * Must send back all relevant user info for login (see IUser) in types/indes.tsx
 * Request made from [code].tsx
 */

export default async (req, res): Promise<ILoginResponse> => {

    const {
        method,
        body: { userId, username, password, confirmPassword },
    } = req;

    const cookies = new Cookies(req, res);
    
    try {
        // POST: update info for user and verify account
        if (method === 'POST') {
            // Check that username is properly formatted
            const filterResult = usernameFilter(username);
            if (!filterResult) {
                return res.json({ status: 'rejected', message: filterResult.message });
            }
            // Check that no profanity
            if (profanityFilter(username)) {
                return res.json({ status: 'rejected', message: 'Profanity is not allowed in your username' });
            }
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

            // Update user info
            const newUserRes = await db.query(`
                INSERT INTO users(username, password, dateCreated, lastLoggedIn, authenticated)
                VALUES('${username}', '${hashedPassword}', '${datetime}', '${datetime}', 1) 
            `);
            if (newUserRes.error) {
                // Handle duplicate entry errors with an error message
                if (newUserRes.error.code === 'ER_DUP_ENTRY') {
                    return res.json({ status: 'rejected', message: 'This username is already registered.' });
                }
                // If that's not the error, handle it like any other
                throw new Error(newUserRes.error);
            }

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
                SELECT email, admin
                FROM users
                WHERE userId=${userId}
            `);
            if (getUserInfo.error) throw new Error(getUserInfo.error);
            const { email, admin } = getUserInfo[0];

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
