import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../../lib/prisma';
import { IApiResponse } from '../../../../../../types';

export default async (
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse>
) => {
    let result;

    const {
        method,
        query: { id },
    } = req;

    try {
        // DELETE: delete user by userId
        if (method === 'DELETE') {
            // Delete user from database
            await prisma.user.delete({
                where: {
                    id: parseInt(id as string),
                },
            });
            // Delete outstanding verification code
            await prisma.code.deleteMany({
                where: {
                    userId: parseInt(id as string),
                },
            });
            return res.status(200).json({
                status: 'success',
            });
        }
    } catch (e) {
        console.log('error in [userId]: ', e.code, e.message);
        return res.status(500).json({
            status: 'error',
            message: e.message,
        });
    }
};
