import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';
import { IApiResponse } from '../../../types';
import prisma from '../../../lib/prisma';

export default async (
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse>
) => {
    const {
        method,
        body: { email },
    } = req;

    /**
     * NOTE: Assuming that when there is an error creating the user
     * that it will go into the catch block
     */

    try {
        if (method === 'POST') {
            console.log('email in api', email);
            await prisma.user.create({
                data: {
                    email,
                },
            });
            return res.status(200).json({
                status: 'success',
            });
        }
        throw new Error();
    } catch (e) {
        console.log('catch block error in api', e);
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.log('Known prisma error');
        }
        return res.status(500).send({
            status: 'error',
            message: e.message,
        });
    }
};
