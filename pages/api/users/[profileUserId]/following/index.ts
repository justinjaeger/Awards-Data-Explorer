import { NextApiRequest, NextApiResponse } from 'next';
import Prisma from '../../../../../lib/prisma';
import { User } from '../../../../../prisma/user';
import { IApiResponse } from '../../../../../types';

export interface IFollowingResponse extends IApiResponse {
    followers?: User[];
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<IFollowingResponse>
) => {
    const { method, query } = req;
    const followerId = query.profileUserId as string;

    /**
     * WARNING: As this scales, it is probably not good to fetch everynoe at once
     * https://www.youtube.com/watch?v=G7_0VxMRJe4
     */

    try {
        if (method === 'GET') {
            const result = await Prisma.User.user.findUnique({
                where: {
                    id: followerId,
                },
                select: {
                    following: {
                        select: {
                            user: true,
                        },
                    },
                },
            });
            return res.status(200).json({
                status: 'success',
                followers: result.following.map((f) => f.user),
            });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).send({
            status: 'error',
            message: 'An error has occured.',
        });
    }
};
