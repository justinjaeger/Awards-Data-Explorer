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
            return res.json({message: 'GET inside /users/id', id})
        }
        if (method === 'POST') {
            return res.json({message: 'POST inside /users/id', id})
        }

    } catch (e) {
        console.log("error ", e);
        return res.status(500).send(e.message);
    }
};
