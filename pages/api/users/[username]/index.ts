import { NextApiRequest, NextApiResponse } from 'next';
import { IApiResponse } from '../../../../types';
import prisma from '../../../../lib/prisma';
import { Prisma, User } from '.prisma/client';

export interface IGetProfileUserResponse extends IApiResponse {
    profileUser?: User;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<IGetProfileUserResponse>
) => {
    const { method, query } = req;
    const username = query.username as string;

    try {
        if (method === 'GET') {
            const result = await prisma.user.findUnique({
                where: {
                    username,
                },
                rejectOnNotFound: true,
            });
            return res.status(200).send({
                status: 'success',
                profileUser: result,
            });
        }
        throw new Error();
    } catch (e) {
        console.log(e);
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.log('CODE', e.code);
            if (e.code === 'P2002') {
                return res.json({
                    status: 'error',
                    message: 'This email is already registered.',
                });
            }
        }
        return res.status(500).send({
            status: 'error',
            message: 'An error has occured',
        });
    }
};
