import db from "../../../../lib/db";

export default async (req, res) => {
    let result;

    const {
        method,
        query: { id },
        body: {},
    } = req;

    try {
        if (method === 'GET') {
            result = await db.query(`
                SELECT userId, username, image
                FROM users
                WHERE userId IN (
                    SELECT follower FROM followers
                    WHERE userId='${userId}'
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

    } catch (e) {
        console.log("error ", e);
        return res.status(500).send(e.message);
    }
};
