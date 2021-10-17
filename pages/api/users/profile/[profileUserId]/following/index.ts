import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../../lib/prisma';
import { IFollower, IApiResponse } from '../../../../../../types';

interface IFollowerResponse extends IApiResponse {
    following?: IFollower[];
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<IFollowerResponse>
) => {
    const {
        method,
        query: { id },
        body: { targetUserId },
    } = req;

    try {
        // Get array of user's followers
        if (method === 'GET') {
            // get user's "following" (first request)
            // Second request, get list of those users by the IDs just received
            const { following: followingIds } = await prisma.user.findUnique({
                where: {
                    id: parseInt(id as string),
                },
                select: {
                    following: {
                        select: {
                            userId: true,
                        },
                    },
                },
            });
            // https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance#solving-n1-with-in
            const following = await prisma.user.findMany({
                where: {
                    id: {
                        in: [...followingIds.map((f) => f.userId)],
                    },
                },
                select: {
                    id: true,
                    username: true,
                    image: true,
                },
            });
            return res.status(200).json({
                status: 'success',
                following,
            });
        }

        // Follow a target user
        if (method === 'POST') {
            prisma.follower.create({
                data: {
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
        return res.status(500).send({
            status: 'error',
            message: e.message,
        });
    }
};
