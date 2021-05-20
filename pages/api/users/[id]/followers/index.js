import db from "../../../../../lib/db";

export default async (req, res) => {
    let result;

    const {
        method,
        query: { id },
        body: {},
    } = req;

    try {
        // Return all of id's followers
        if (method === 'GET') {
            result = await db.query(`
                SELECT userId, username, image
                FROM users
                WHERE userId IN (
                    SELECT follower FROM followers
                    WHERE userId='${id}'
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
