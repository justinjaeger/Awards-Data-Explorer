import prisma from '../../../../../lib/prisma';
import { IApiResponse } from '../../../../../types';
import { NextApiRequest, NextApiResponse } from 'next';

interface IProfileUserResponse extends IApiResponse {
    userId?: number;
    image?: string;
}

export default async (req: NextApiRequest, res: NextApiResponse<IProfileUserResponse>) => {

    const {
        method,
        query: { username },
        body: {},
    } = req;
    
    /**
     * An "unprotected" route for getting data on other users
     */

    try {
        /**
         * Check that a user with this name exists...
         * if not, throw a 404 page
         */
        if (method === 'GET') {
            let result = await db.query(`
                SELECT userId, image
                FROM users
                WHERE username='${username}'
            `);
            if (result.error) throw new Error(result.error);
            if (!result.length) return res.json({ 
                status: 'rejected',
                message: '404',
            });
            const { userId, image } = result[0];
            return res.status(200).json({
                status: 'success',
                userId,
                image,
            });
        }

    } catch(e) {
        console.log('error: ', e.message);
        return res.status(500).json({
            status: 'error',
            message: e.message,
        });
    }
};
