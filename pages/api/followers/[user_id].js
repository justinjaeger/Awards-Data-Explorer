import db from "../../../lib/db";

/**
 * Admin actions on rank_category
 */

export default async (req, res) => {
    let result;

    const {
        method,
        query: { userId, action },
        body: { target_userId },
    } = req;

    try {
        // GET: Get a user's followers or following
        if (method === "GET") {
            if (action === 'followers') {
                result = await db.query(`
                    SELECT userId, username, image
                    FROM users
                    WHERE userId IN (
                        SELECT follower FROM followers
                        WHERE userId='${userId}'
                    )
                `);
            }
            if (action === 'following') {
                result = await db.query(`
                    SELECT userId, username, image
                    FROM users
                    WHERE userId IN (
                        SELECT userId FROM followers
                        WHERE userId='${userId}'
                    )
                `);
            }
            if (result.error) {
                throw result.error;
            }
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
