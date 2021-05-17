import db from "../../../../lib/db";

/**
 * All non-user-specific actions for RANK game
 */

export default async (req, res) => {
    let result;

    const {
        method,
        query: { rank_movie_id },
    } = req;

    try {
        // DELETE: Remove the list item
        if (method === "DELETE") {
            // Delete all rank_user entries first, or else conflict
            result = await db.query(`
        DELETE FROM rank_user
        WHERE rank_movie_id=${rank_movie_id}
      `);
            if (result.error) {
                throw result.error;
            }
            // Delete movie from rank_movie
            result = await db.query(`
        DELETE FROM rank_movie
        WHERE rank_movie_id=${rank_movie_id}
      `);
            if (result.error) {
                throw result.error;
            }
            console.log("delete ", result);
            if (!result.affectedRows) {
                return res.status(500).send("Nothing was deleted");
            }
            return res.status(200).send("Success");
        }
    } catch (e) {
        console.log("error ", e);
        return res.status(500).send(e.message);
    }
};
