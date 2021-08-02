import db from '../../../../../../lib/db';
import { IFollower } from '../../../../../../types';
import { IFollowerResponse } from '../../../../../../types/responses';

export default async (req, res): Promise<IFollowerResponse> => {

    const {
        method,
        query: { id },
        body: { targetUserId },
    } = req;

    try {
        // Get array of user's followers
        if (method === 'GET') {
            const result = await db.query(`
                SELECT userId, username, image
                FROM users
                WHERE userId IN (
                    SELECT userId FROM followers
                    WHERE userId=${id}
                )
            `);
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

        // Follow a target user
        if (method === 'POST') {
            const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const result = await db.query(`
                INSERT INTO followers(userId, follower, dateCreated)
                VALUES(${targetUserId}, ${id}, '${datetime}')
            `);
            if (result.error) throw new Error(result.error);
            return res.status(200).json({
                status: 'success'
            });
        };

    } catch(e) {
        console.log('error: ', e.message);
        return res.status(500).send({
            status: 'error',
            message: e.message
        });
    }
};
