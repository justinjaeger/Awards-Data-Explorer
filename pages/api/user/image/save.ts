import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import prisma from '../../../../lib/prisma';
import { IApiResponse } from '../../../../types';

export type ISaveProfileImage = IApiResponse;

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ISaveProfileImage>
) => {
    const { method, body } = req;
    const edgeUrl = body.edgeUrl as string;

    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send({
            status: 'error',
            message: 'User not authenticated',
        });
    }

    try {
        if (method === 'POST') {
            await prisma.user.update({
                where: {
                    id: session.user.id,
                },
                data: {
                    image: edgeUrl,
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
