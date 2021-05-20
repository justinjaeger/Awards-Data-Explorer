import db from "../../../../../lib/db";

export default async (req, res) => {

    const {
        method,
        query: { id },
        body: { target_user_id },
    } = req;

    try {
        // Get array of user's followers
        if (method === 'GET') {
            let result = await db.query(`
                SELECT userId, username, image
                FROM users
                WHERE userId IN (
                    SELECT userId FROM followers
                    WHERE userId='${id}'
                )
            `);
            const followers = result.map(user => {
                const image = user.image ? user.image : "/PROFILE.png";
                return {
                    userId: user.userId,
                    username: user.username,
                    image,
                };
            });
            return res.status(200).json({
                followers
            });
        }

        // Follow a target user
        if (method === 'POST') {
            const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
            await db.query(`
                INSERT INTO followers(userId, follower, dateCreated)
                VALUES('${target_user_id}', '${id}', '${datetime}')
            `);
            return res.sendStatus(200);
        };

        // Unfollow a target user and return updated followers
        if (method === 'DELETE') {
            // Unfollow
            let result = await db.query(`
                DELETE FROM followers 
                WHERE username='${target_user_id}' AND follower='${id}'
            `);
            if (result.error) throw new Error(result.error);

            // Refresh target user's followers
            result = await db.query(`
                SELECT userId, username, image
                FROM users
                WHERE userId IN (
                    SELECT userId FROM followers
                    WHERE userId='${target_user_id}'
                )
            `);
            if (result.error) throw new Error(result.error);
            const followers = result.map(user => {
                const image = user.image ? user.image : "/PROFILE.png";
                return {
                    userId: user.userId,
                    username: user.username,
                    image,
                };
            });
            return res.status(200).json({
                followers
            });
        }

    } catch(e) {
        console.log("error: ", e.message);
        return res.status(500).send(e.message);
    }
};
