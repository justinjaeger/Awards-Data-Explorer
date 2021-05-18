import db from "../../../../../lib/db";

export default async (req, res) => {
    let result;

    const {
        method,
        query: { id },
        body: { target_user_id },
    } = req;

    try {
        // validate if id is following a target user
    } catch (e) {
        console.log("error ", e);
        return res.status(500).send(e.message);
    }
};
