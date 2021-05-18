import db from "../../../lib/db";

/**
 * All non-user-specific actions for RANK game
 */

export default async (req, res) => {
    let result;

    const { method } = req;

    try {
        // GET: Load the data for this set
        if (method === "GET") {
            // Get movies associated with category
            result = await db.query(`
        SELECT * FROM rank_category
        ORDER BY year DESC
      `);
            if (result.error) {
                throw result.error;
            }
            return res.status(200).json({
                list: result,
            });
        }

        // POST: Create a new category
        if (method === "POST") {
        }
    } catch (e) {
        console.log("error ", e);
        return res.status(500).send(e.message);
    }
};
