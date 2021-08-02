import prisma from '../../../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { IApiResponse } from '../../../../../../types';

export default async (req: NextApiRequest, res: NextApiResponse<IApiResponse>) => {

    let result;

    const {
        method,
        query: { userId },
    } = req;
    
    try {
        // DELETE: delete user by userId
        if (method === 'DELETE') {
            // Delete user from database
            result = await db.query(`
                DELETE FROM users
                WHERE userId=${userId}
            `);
            if (result.error) throw new Error(result.error);
            // Delete outstanding verification code
            result = await db.query(`
                DELETE FROM codes
                WHERE userId=${userId}
            `);
            if (result.error) throw new Error(result.error);

            return res.status(200).json({ 
                status: 'success',
            });
        }

    } catch(e) {
        console.log('error in [userId]: ', e.message);
        return res.status(500).json({
            status: 'error',
            message: e.message,
        });
    }
};
