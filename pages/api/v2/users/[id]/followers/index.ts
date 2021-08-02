import prisma from '../../../../../../lib/prisma';
import { IFollower } from '../../../../../../types';
import { IApiResponse } from '../../../../../../types';
import { NextApiRequest, NextApiResponse } from 'next';

interface IFollowerResponse extends IApiResponse {
    followers?: IFollower[];
}

export default async (req: NextApiRequest, res: NextApiResponse<IFollowerResponse>) => {

    const {
        method,
        query: { id },
    } = req;

    try {
        // Return all of id's followers
        if (method === 'GET') {
            const result = await db.query(`
                SELECT userId, username, image
                FROM users
                WHERE userId IN (
                    SELECT follower FROM followers
                    WHERE userId=${id}
                )
            `);
            if (result.error) throw new Error(result.error);
            
            const followers: IFollower[] = result.map(user => {
                const image = user.image ? user.image : '/PROFILE.png';  // obsolete since this is set by default in mysql
                return {
                    userId: user.userId,
                    username: user.username,
                    image,
                };
            });
            return res.status(200).json({
                status: 'success',
                followers,
            });
        }

    } catch(e) {
        console.log('error: ', e.message);
        return res.status(500).send({
            status: 'error',
            message: e.message
        });
    }
};
