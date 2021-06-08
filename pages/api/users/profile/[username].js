import db from '../../../../lib/db';

export default async (req, res) => {

    const {
        method,
        query: { username },
        body: {},
    } = req;
    

    try {
        /** Called whenever request is made to /username
         * Check that a user with this name exists...
         * if not, throw a 404 page
         */
        if (method === 'GET') {
            let result = await db.query(`
                SELECT userId, image
                FROM users
                WHERE username='${username}'
            `);
            if (result.error) throw new Error(result.error);
            if (!result.length) return res.json({ send404: true });
            const { userId, image } = result[0];
            return res.status(200).json({
                userId,
                image,
            });
        }

    } catch(e) {
        console.log('error: ', e.message);
        return res.status(500).send(e.message);
    }
};
