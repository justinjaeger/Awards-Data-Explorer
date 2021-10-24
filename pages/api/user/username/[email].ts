import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';
import { IApiResponse } from '../../../../types';
import prisma from '../../../../lib/prisma';

export interface ICreateUsernameResponse extends IApiResponse {
    username?: string;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ICreateUsernameResponse>
) => {
    const { method, query, body } = req;
    const email = query.email as string;
    const username = body.username as string;

    try {
        if (method === 'POST') {
            const result = await prisma.user.update({
                where: {
                    email,
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
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
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
