import db from '../../../lib/db';

/**
 * All user-specific actions for RANK game
 */

export default async (req, res) => {

  let result;

  const { 
    method,
    query: { user_id, rank_movie_id },
    body: { operator },
  } = req;

  try {

    // GET: Get user specific score for individual film
    if (method==='GET') {
      result = await db.query(`
        SELECT * FROM rank_user
        WHERE user_id=${user_id}
        AND rank_movie_id=${rank_movie_id}
      `)
      if (result.error) {
        throw result.error;
      };
      if (!result.length) {
        return res.status(200).json({score: 0})
      };
      const { score } = result[0];
      return res.status(200).json({score});
    };

    // POST: Increment or decrement score
    if (method==='POST') {

      // Alter rank_movie score
      result = await db.query(`
        UPDATE rank_movie
        SET score = score${operator}1
        WHERE rank_movie_id=${rank_movie_id}
      `)
      if (result.error) {
        throw result.error;
      };
      if (!result.affectedRows) {
        return res.status(500).send('No change made to rank_movie');
      };

      // Insert entry into rank_user if not exists
      result = await db.query(`
        INSERT IGNORE INTO rank_user(user_id, rank_movie_id)
        VALUES(${user_id}, ${rank_movie_id})
      `);
      if (result.error) {
        throw result.error;
      };

      // Alter rank_user score
      result = await db.query(`
        UPDATE rank_user
        SET score = score ${operator} 1
        WHERE rank_movie_id=${rank_movie_id}
        AND user_id=${user_id}
      `);
      if (result.error) {
        throw result.error;
      };
      if (!result.affectedRows) {
        return res.status(500).send('No change made to rank_user');
      };

      return res.status(200).send('Success');
    };

  }
  catch(e) {
    console.log('error ', e);
    return res.status(500).send(e.message);
  };

};
