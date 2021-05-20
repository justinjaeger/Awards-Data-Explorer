import db from "../../../../../lib/db";

export default async (req, res) => {

    const {
        method,
        query: { id },
    } = req;

    try {
        // count how many users are following id
        if (method === 'GET') {
            await db.query(`
                SELECT COUNT(*) AS sum FROM followers 
                WHERE follower='${id}'
            `)
            if (result.error) throw new Error(result.error);
            return res.json({ numFollowing: result[0].sum });
        }

    } catch(e) {
        console.log("error: ", e.message);
        return res.status(500).send(e.message);
    }
};
