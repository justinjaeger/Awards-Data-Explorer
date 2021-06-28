import db from '../../../../../lib/db';
import { IFollowerCountResponse } from '../../../../../types/responses';

export default async (req, res): Promise<IFollowerCountResponse> => {

    const {
        method,
        query: { id },
    } = req;

    try {
        // count how many users are following id
        if (method === 'GET') {
            const result = await db.query(`
                SELECT COUNT(*) AS sum FROM followers 
                WHERE follower=${id}
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
