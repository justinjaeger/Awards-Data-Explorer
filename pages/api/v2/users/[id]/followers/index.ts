import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../../lib/prisma';
import { IFollower, IApiResponse } from '../../../../../../types';

interface IFollowerResponse extends IApiResponse {
    followers?: IFollower[];
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<IFollowerResponse>
) => {
    const {
        method,
        query: { id },
    } = req;

    try {
        // Return all of id's followers
        if (method === 'GET') {
            // look at followers
            // any person who follows me
            // they are the follower / followerId, therefore I am userId
            // any entry where userId = id
            // but once you get that entry, you then have to query for each user's information
            const { followers: followerIds } = await prisma.user.findUnique({
                where: {
                    id: parseInt(id as string),
                },
                select: {
                    followers: {
                        select: {
                            userId: true,
                        },
                    },
                },
            });
            // https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance#solving-n1-with-in
            const followers = await prisma.user.findMany({
                where: {
                    id: {
                        in: [...followerIds.map((f) => f.userId)],
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
                followers,
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
