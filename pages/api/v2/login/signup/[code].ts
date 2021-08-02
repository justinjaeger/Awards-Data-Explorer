import prisma from '../../../../../lib/prisma';
import { IVerifyCodeResponse } from '../../../../../types/responses';

export default async (req, res): Promise<IVerifyCodeResponse> => {

    const {
        method,
        query: { code },
    } = req;
    
    try {
         // GET: retrieve user info based on query code
         if (method === 'GET') {
            // Delete user from database
            const codeResult = await db.query(`
                SELECT * FROM codes
                WHERE code=${code}
            `);
            if (codeResult.error) throw new Error(codeResult.error);
            const { userId, expiration } = codeResult.data[0];
            // Check if expired
            const currentTime = Math.ceil(Date.now() / 1000);
            if (currentTime - expiration > 0) {
                return res.status(498).json({
                    status: 'rejected',
                    message: 'Verification code has expired. Please attempt signup again.'
                })
            }
            // Delete outstanding verification code
            const deleteResult = await db.query(`
                DELETE FROM codes
                WHERE code=${code}
            `);
            if (deleteResult.error) throw new Error(deleteResult.error);

            return res.status(200).json({ 
                status: 'success',
                userId,
            });
         }

    } catch(e) {
        console.log('error in [code].ts: ', e.message);
        return res.status(500).json({
            status: 'error',
            message: e.message,
        });
    }
};
