import { NextApiRequest, NextApiResponse } from 'next';
import { IApiResponse } from '../../../../../types';
import Prisma from '../../../../../lib/prisma';

export interface IFollowerCountResponse extends IApiResponse {
    count?: number;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<IFollowerCountResponse>
) => {
    const { method, query } = req;
    const userId = query.profileUserId as string;

    try {
        // count how many followers id has
        if (method === 'GET') {
            const count = await Prisma.User.follower.count({
                where: {
                    userId,
                },
            });
            return res.send({
                status: 'success',
                count,
            });
        }
        throw new Error();
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            status: 'error',
            message: 'An error has occured',
        });
    }
};
