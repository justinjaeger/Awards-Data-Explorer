import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import Prisma from '../../../../lib/prisma';
import { IApiResponse } from '../../../../types';

export type IFollow = IApiResponse;

export default async (req: NextApiRequest, res: NextApiResponse<IFollow>) => {
    const { method, query } = req;
    const targetUserId = query.targetUserId as string;

    const session = await getSession({ req });

    if (!session) {
        return res.status(401).send({
            status: 'error',
            message: 'User not authenticated',
        });
    }

    try {
        if (method === 'POST') {
            await Prisma.User.follower.create({
                data: {
                    userId: targetUserId,
                    followerId: session.user.id,
                },
            });
            return res.status(200).send({
                status: 'success',
            });
        }
        if (method === 'DELETE') {
            await Prisma.User.follower.delete({
                where: {
                    userId_followerId: {
                        userId: targetUserId,
                        followerId: session.user.id,
                    },
                },
            });
            return res.status(200).send({
                status: 'success',
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
