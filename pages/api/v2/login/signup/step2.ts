import db from '../../../../../lib/db';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import Cookies from 'cookies';
import profanityFilter from '../../../../../utils/profanityFilter';
import usernameFilter from '../../../../../utils/usernameFilter';
import { encrypt } from '../../../utils/encrypt';
import { verificationEmail, verificationCode } from '../../../utils/mailHelper';

/**
 * User submits SignUp info. Account is created, and they redirect to dashboard
 * Once you create your account, you are verified with the email this came from AND authenticated. But do not authenticate before that
 */

// Overall, this needs to verify the user and create them in the database

export default async (req, res) => {

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
            if (filterResult.status === false) {
                return res.json({ error: filterResult.message });
            }
            // Check that no profanity
            if (profanityFilter(username) === true) {
                return res.json({ error: 'Profanity is not allowed in your username' });
            }
            // Check that passwords match
            if (password !== confirmPassword) {
                return res.json({ error: 'Passwords do not match.' });
            }
            // Check that password is proper length
            if (password.length < 8) {
                return res.json({ error: 'Password must be more than 8 characters.' });
            }
            if (password.length > 20) {
                return res.json({ error: 'Password must be less than 20 characters.' });
            }

            // Hash password using bcrypt
            const hashedPassword = await bcrypt.hash(password, 8);
            if (hashedPassword.error) throw new Error(hashedPassword.error);

            // Get the datetime
            const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');

            // Create new user in database
            const newUserRes = await db.query(`
                INSERT INTO users(email, username, password, dateCreated, lastLoggedIn, authenticated)
                VALUES('${username}', '${hashedPassword}', '${datetime}', '${datetime}', 1) 
            `);
            if (newUserRes.error) {
                // Handle duplicate entry errors with an error message
                if (newUserRes.error.code === 'ER_DUP_ENTRY') {
                    return newUserRes.error.sqlMessage.split('.')[1] === `username'`
                        ? res.json({ error: 'This username is already registered.' })
                        : res.json({ error: 'This email is already registered.' });
                }
                // If that's not the error, handle it like any other
                throw new Error(newUserRes.error);
            }

            // Create access token
            const accessToken = jwt.sign(
                { userId }, // payload
                process.env.ACCESS_TOKEN_SECRET,
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

            // Redirect to user dashboard (login data will be obtained from access token there)
            return res.redirect(`user/${username}`);
        };

    } catch(e) {
        console.log('error: ', e.message);
        return res.status(500).send(e.message);
    }
};
