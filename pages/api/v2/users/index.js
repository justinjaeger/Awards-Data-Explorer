import db from '../../../lib/db';

export default async (req, res) => {

    const {
        method,
        query: {},
        body: {},
    } = req;

    try {
        if (method === 'GET') {
            return res.json({message: 'GET inside /users'})
        }
        if (method === 'POST') {
            return res.json({message: 'POST inside /users'})
        }

    } catch(e) {
        console.log('error: ', e.message);
        return res.status(500).send(e.message);
    }
};
