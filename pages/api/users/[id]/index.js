import db from "../../../../lib/db";

export default async (req, res) => {

    const {
        method,
        query: { id },
        body: {},
    } = req;
    

    try {
        // Fetch user's profile information by ID -- don't have a use for this yet
        if (method === 'GET') {
            let result = await db.query(`
                SELECT username, email, admin, image, dateCreated, lastLoggedIn
                FROM users
                WHERE userId='${id}'
            `);
            if (result.error) throw new Error(result.error);
            if (!result.length) throw new Error('no results returned');
            const { username, email, admin, image, dateCreated, lastLoggedIn } = result[0];
            return res.status(200).json({ 
                username, 
                email, 
                admin, 
                image, 
                dateCreated, 
                lastLoggedIn 
            });
        }

    } catch(e) {
        console.log("error: ", e.message);
        return res.status(500).send(e.message);
    }
};
