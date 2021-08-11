import prisma from '../../../../../lib/prisma';
import { IApiResponse } from '../../../../../types';
import { NextApiRequest, NextApiResponse } from 'next';

interface IVerifyCodeResponse extends IApiResponse {
    id?: number;
}

export default async (req: NextApiRequest, res: NextApiResponse<IVerifyCodeResponse>) => {

    const {
        method,
        query: { code },
    } = req;
    
    try {
         // GET: retrieve user info based on query code
         if (method === 'GET') {
            // Delete user from database
            const { userId, expiration } = await prisma.code.findUnique({
                where: {
                    code: parseInt(code as string),
                },
            })
            // Check if expired
            const currentTime = Math.ceil(Date.now() / 1000);
            if (currentTime - expiration > 0) {
                return res.status(498).json({
                    status: 'rejected',
                    message: 'Verification code has expired. Please attempt signup again.'
                })
            }
            // Delete outstanding verification code
            await prisma.code.delete({
                where: {
                    code: parseInt(code as string),
                }
            });

            return res.status(200).json({ 
                status: 'success',
                id: userId,
            });
         }

    } catch(e) {
        console.log('error in [code].ts: ', e.code, e.message);
        return res.status(500).json({
            status: 'error',
            message: e.message,
        });
    }
};
