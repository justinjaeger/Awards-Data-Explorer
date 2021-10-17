import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';
import { IApiResponse } from '../../../../../types';
import { Follower } from '.prisma/client';

export interface ICheckIfFollowing extends IApiResponse {
    following?: boolean;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ICheckIfFollowing>
) => {
    const { method, query } = req;
    const userId = query.profileUserId as string;
    const followerId = query.id as string;

    try {
        if (method === 'GET') {
            await prisma.follower
                .findFirst({
                    where: {
                        userId,
                        followerId,
                    },
                    rejectOnNotFound: false,
                })
                .then((data: Follower) => {
                    if (data) {
                        return res.status(200).json({
                            status: 'success',
                            following: true,
                        });
                    }
                    return res.status(200).json({
                        status: 'success',
                        following: false,
                    });
                });
        }
        throw new Error();
    } catch (e) {
        console.error(e);
        return res.status(500).send({
            status: 'error',
            message: 'An error has occurred',
        });
    }
};
