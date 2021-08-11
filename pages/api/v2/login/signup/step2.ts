import prisma from '../../../../../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import Cookies from 'cookies';
import profanityFilter from '../../../../../utils/profanityFilter';
import usernameFilter from '../../../../../utils/usernameFilter';
import { IApiResponse, IUser } from '../../../../../types';
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';

interface ILoginResponse extends IApiResponse {
    user?: IUser;
}

/**
 * User has already been partially created (see step1.ts)
 * User has just submitted Signup info (username, password)
 * This checks their username + password, sets them, and validates the account
 * Must send back all relevant user info for login (see IUser) in types/indes.tsx
 * Request made from [code].tsx
 */

export default async (req: NextApiRequest, res: NextApiResponse<ILoginResponse>) => {

    const {
        method,
        body: { id, username, password, confirmPassword },
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

            // Update user info and get remaining fields
            const { email, role, image } = await prisma.user.update({
                data: {
                    username,
                    password: hashedPassword,
                    lastLoggedIn: datetime,
                },
                where: {
                    id: id as number, // ts flag because again it would be nice to be able to type the body of the incoming request (do a wrapper for this later)
                },
                select: {
                    email: true,
                    role: true,
                    image: true,
                },
            });

            // Create access token
            const accessToken: string = jwt.sign(
                { id }, // payload
                process.env.ACCESS_TOKEN_SECRET, // secret
                { expiresIn: '10m' } // options
            );

            // Save token in db
            await prisma.token.create({
                data: {
                    accessToken,
                    userId: id,
                }
            });

            // Set new cookie in browser
            cookies.set('accessToken', accessToken, { httpOnly: true });

            return res.status(200).json({
                status: 'success',
                user: {
                    id,
                    username,
                    email,
                    role,
                    image,
                }
            });
        };

    } catch(e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return res.json({
                    status: 'rejected',
                    message: 'This email is already registered.'
                });
            }
        }
        console.log('error in step2.ts: ', e.code, e.message);
        return res.status(500).json({ 
            status: 'error', 
            message: e.message,
        });
    }
};
