import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../../lib/prisma';
import { IFollowerCountResponse } from '../follower/count';

export default async (
    req: NextApiRequest,
    res: NextApiResponse<IFollowerCountResponse>
) => {
    const { method, query } = req;
    const followerId = query.profileUserId as string;

    try {
        // count how many users are following id
        if (method === 'GET') {
            const count = await prisma.follower.count({
                where: {
                    followerId,
                },
            });
            return res.json({
                status: 'success',
                count,
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: 'error',
            message: 'An error has occured',
        });
    }
};
