import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import Prisma from '../../../../lib/prisma';
import { IApiResponse } from '../../../../types';

export interface ICheckIfFollowing extends IApiResponse {
    following?: boolean;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ICheckIfFollowing>
) => {
    const { method, query } = req;
    const userId = query.profileUserId as string;
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send({
            status: 'error',
            message: 'User not authenticated',
        });
    }

    try {
        if (method === 'GET') {
            const result = await Prisma.User.follower.findFirst({
                where: {
                    userId,
                    followerId: session.user.id,
                },
                rejectOnNotFound: false,
            });
            if (result) {
                return res.status(200).send({
                    status: 'success',
                    following: true,
                });
            }
            return res.status(200).send({
                status: 'success',
                following: false,
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
