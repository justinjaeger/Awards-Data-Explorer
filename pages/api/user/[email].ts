import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';
import { IApiResponse, IUser } from '../../../types';
import prisma from '../../../lib/prisma';

export interface IGetUserResponse extends IApiResponse {
    user?: IUser;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<IGetUserResponse>
) => {
    const { method, query } = req;
    const email = query.email as string;

    try {
        if (method === 'GET') {
            const { id, username, image, role } = await prisma.user.findUnique({
                where: {
                    email,
                },
            });
            return res.status(200).send({
                status: 'success',
                user: {
                    id,
                    username,
                    email,
                    role,
                    image,
                },
            });
        }
        throw new Error();
    } catch (e) {
        console.error(e);
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.log('Known prisma error. Code:', e.code);
        }
        return res.status(500).send({
            status: 'error',
            message: e.message,
        });
    }
};
