import prisma from '../../../../../../lib/prisma';
import { IApiResponse } from '../../../../../../types';
import { NextApiRequest, NextApiResponse } from 'next';

interface IDetermineFollowingResponse extends IApiResponse {
    following?: boolean;
}

export default async (req: NextApiRequest, res: NextApiResponse<IDetermineFollowingResponse>) => {

    const {
        method,
        query: { id, targetUserId },
    } = req;

    try {
        // Check if user is following target profile
        if (method==='GET') {
            let result = await db.query(`
                SELECT * FROM followers
                WHERE userId=${targetUserId}
                AND follower=${id}
            `);
            if (result.error) throw new Error(result.error);
            return res.status(200).json({ 
                status: 'success',
                following: result.length ? true : false,
            });
        }

        // Unfollow a target user
        if (method === 'DELETE') {
            // Unfollow
            const deleteResult = await db.query(`
                DELETE FROM followers 
                WHERE userId=${targetUserId} AND follower=${id}
            `);
            if (deleteResult.error) throw new Error(deleteResult.error);
            return res.status(200).json({
                status: 'success'
            });
        }
    } catch(e) {
        console.log('error: ', e.message);
        return res.status(500).json({
            status: 'error',
            message: e.message
        });
    }
};
