import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma as PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/client';
import { IApiResponse } from '../../../types';
import Prisma from '../../../lib/prisma';

export interface ICreateUsernameResponse extends IApiResponse {
    username?: string;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ICreateUsernameResponse>
) => {
    const { method, body } = req;
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send({
            status: 'error',
            message: 'User is not authenticated.',
        });
    }
    const username = body.username as string;

    try {
        if (method === 'POST') {
            const result = await Prisma.User.user.update({
                where: {
                    id: session.user.id,
                },
                data: {
                    username,
                },
            });
            return res.status(200).send({
                status: 'success',
                username: result.username,
            });
        }
        throw new Error();
    } catch (e) {
        console.error(e);
        if (e instanceof PrismaClient.PrismaClientKnownRequestError) {
            let message = e.message;
            if (e.code === 'P2002') {
                message = 'This username has already been taken.';
            }
            return res.status(400).send({
                status: 'rejected',
                message: message,
            });
        }
        return res.status(500).send({
            status: 'error',
        });
    }
};
