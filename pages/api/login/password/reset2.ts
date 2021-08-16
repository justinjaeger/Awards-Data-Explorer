import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { IApiResponse, IUser } from '../../../../types';

interface IReset2Response extends IApiResponse {
    user?: IUser;
}

/**
 * User has clicked the link in their email to reset password
 * and submitted new password
 * This checks password, updates it, and logs the user in
 */

export default async (
    req: NextApiRequest,
    res: NextApiResponse<IReset2Response>
) => {
    const {
        method,
        body: { id, password, confirmPassword },
    } = req;

    const cookies = new Cookies(req, res);

    try {
        // POST: update info for user and verify account
        if (method === 'POST') {
            // Check that passwords match
            if (password !== confirmPassword) {
                return res.json({
                    status: 'rejected',
                    message: 'Passwords do not match.',
                });
            }
            // Check that password is proper length
            if (password.length < 8) {
                return res.json({
                    status: 'rejected',
                    message: 'Password must be more than 8 characters.',
                });
            }
            if (password.length > 20) {
                return res.json({
                    status: 'rejected',
                    message: 'Password must be less than 20 characters.',
                });
            }

            // Hash password using bcrypt
            const hashedPassword = await bcrypt.hash(password, 8);
            if (hashedPassword.error) throw new Error(hashedPassword.error);

            // Get the datetime
            const datetime = new Date()
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ');

            // Update password
            await prisma.user.update({
                data: {
                    password: hashedPassword,
                    lastLoggedIn: datetime,
                },
                where: {
                    id,
                },
            });

            // Create access token
            const accessToken = jwt.sign(
                { id }, // payload
                process.env.ACCESS_TOKEN_SECRET, // secret
                { expiresIn: '10m' } // options
            );

            // Save access token
            await prisma.token.create({
                data: {
                    accessToken,
                    userId: id,
                },
            });

            // Set new cookie in browser
            cookies.set('accessToken', accessToken, { httpOnly: true });

            // Get remaining user info for login
            const { username, email, role, image } =
                await prisma.user.findUnique({
                    where: {
                        id,
                    },
                });

            return res.status(200).json({
                status: 'success',
                user: {
                    id,
                    username,
                    email,
                    role,
                    image,
                },
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
