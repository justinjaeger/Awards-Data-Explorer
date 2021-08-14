import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../../lib/prisma';
import { IApiResponse } from '../../../../../../types';

interface IDetermineFollowingResponse extends IApiResponse {
    following?: boolean;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<IDetermineFollowingResponse>
) => {
    const {
        method,
        query: { id, targetUserId },
    } = req;

    try {
        // Check if user is following target profile
        if (method === 'GET') {
            const count = await prisma.follower.findFirst({
                where: {
                    userId: parseInt(id as string),
                },
            });
            return res.status(200).json({
                status: 'success',
                following: count !== null,
            });
        }

        // Unfollow a target user
        if (method === 'DELETE') {
            // Unfollow
            await prisma.follower.deleteMany({
                where: {
                    userId: parseInt(targetUserId as string),
                    followerId: parseInt(id as string),
                },
            });
            return res.status(200).json({
                status: 'success',
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
