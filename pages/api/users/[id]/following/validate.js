import db from "../../../../../lib/db";

export default async (req, res) => {

    const {
        method,
        query: { id },
        body: { target_user_id },
    } = req;

    try {
        // Check if user is following target profile
        // Returns true or false
        if (method==='GET') {
            let result = await db.query(`
                SELECT * FROM followers
                WHERE userId='${target_user_id}'
                AND follower='${id}'
            `);
            if (result.error) throw new Error(result.error);
            let followingUser = result.length ? true : false;
            return res.status(200).json({ followingUser });
        }
        // validate if id is following a target user
    } catch(e) {
        console.log("error: ", e.message);
        return res.status(500).send(e.message);
    }
};
