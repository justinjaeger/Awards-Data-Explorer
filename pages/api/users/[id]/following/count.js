import db from "../../../../../lib/db";

export default async (req, res) => {
    let result;

    const {
        method,
        query: { id },
    } = req;

    try {
        // cuont how many users are following id
    } catch (e) {
        console.log("error ", e);
        return res.status(500).send(e.message);
    }
};
