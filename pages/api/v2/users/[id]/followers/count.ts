import prisma from '../../../../../../lib/prisma';
import { IApiResponse } from '../../../../../../types';
import { NextApiRequest, NextApiResponse } from 'next';

interface IFollowerCountResponse extends IApiResponse {
    count?: number;
}

export default async (req: NextApiRequest, res: NextApiResponse<IFollowerCountResponse>) => {

    const {
        method,
        query: { id },
    } = req;

    try {
        // count how many followers id has
        if (method === 'GET') {
            const result = await db.query(`
                SELECT COUNT(*) AS sum FROM followers 
                WHERE userId=${id}
            `)
            if (result.error) throw new Error(result.error);
            return res.json({ 
                status: 'success',
                count: result[0].sum,
            });
        };
    } catch(e) {
        console.log('error: ', e.message);
        return res.status(500).json({
            status: 'error',
            message: e.message,
        });
    }
};
