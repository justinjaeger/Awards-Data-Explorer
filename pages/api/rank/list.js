import db from 'lib/db';

/**
 * All non-user-specific actions for RANK game
 */

export default async (req, res) => {

  let result;

  const {
    method,
    query: { rank_category_id }
  } = req;

  console.log('rank category id', rank_category_id)

  try {
    // GET: Load the data for this set
    if (method==='GET') {
      // Get movies associated with category
      result = await db.query(`
        SELECT * FROM rank_movie
        WHERE rank_category_id='${rank_category_id}'
        ORDER BY score DESC
      `);
      if (result.error) {
        throw result.error;
      };
      return res.status(200).json({
        list: result
      });
    };

    // POST: Create a new movie entry for this set
    if (method==='POST') {
      const { name } = req.body;
      console.log('NAME', name)
      result = await db.query(`
        INSERT INTO rank_movie (name, rank_category_id)
        VALUES('${name}', ${rank_category_id})
      `)
      if (result.error) {
        let message = result.error.message.split(':')[0];
        if (message === 'ER_DUP_ENTRY') {
          return res.status(409).send('This entry already exists');
        };
        throw result.error;
      };
      if (!result.affectedRows) {
        return res.status(500).send('Entry was not made');
      };
      // Once we have successful entry, 
      // we need to get the rank_movie_id that we just created
      result = await db.query(`
        SELECT rank_movie_id FROM rank_movie
        WHERE name='${name}'
      `)
      if (result.error) {
        throw result.error;
      };
      return res.status(200).json({
        rank_movie_id: result[0].rank_movie_id
      });
    };

  } catch(e) {
    console.log('error ', e);
    return res.status(500).send(e.message);
  };
};
