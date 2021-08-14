import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../../lib/prisma';
import { IApiResponse } from '../../../../../../types';

interface IFollowerCountResponse extends IApiResponse {
    count?: number;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<IFollowerCountResponse>
) => {
    const {
        method,
        query: { id },
    } = req;

    try {
        // count how many followers id has
        if (method === 'GET') {
            const count = await prisma.follower.count({
                where: {
                    userId: parseInt(id as string),
                },
            });
            return res.json({
                status: 'success',
                count,
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
