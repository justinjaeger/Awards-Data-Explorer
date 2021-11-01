import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { IApiResponse } from '../../../types';
import Prisma from '../../../lib/prisma';
import { User } from '../../../prisma/user';

export interface IGetUserResponse extends IApiResponse {
    user?: User;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<IGetUserResponse>
) => {
    const { method } = req;
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send({
            status: 'error',
            message: 'User is not authenticated.',
        });
    }

    try {
        if (method === 'GET') {
            const user = await Prisma.User.user.findUnique({
                where: {
                    id: session.user.id,
                },
            });
            return res.status(200).send({
                status: 'success',
                user,
            });
        }
        throw new Error();
    } catch (e) {
        console.error(e);
        return res.status(500).send({
            status: 'error',
            message: 'An error has occured',
        });
    }
};
