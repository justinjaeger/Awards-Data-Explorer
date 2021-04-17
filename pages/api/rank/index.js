import db from 'lib/db';

/**
 * All actions for RANK game
 */

export default async (req, res, next) => {

  let result;

  const {
    method, // GET or POST etc
    query: { year, cat } // user_id
  } = req;

  try {

    if (method==='GET') {
      // Load the data for this set
      result = await db.query(`
        SELECT * FROM rank_movie
        WHERE year='${year}'
        AND category='${cat}'
      `)
      console.log('result GET',result)

      return res.json({
        // send back list of entries
      })
    };

    if (method==='POST') {
      // Deconstruct req.body
      const { name } = req.body;
      // Create a new movie entry for this set
      result = await db.query(`
        INSERT INTO rank_movie (name, year, category)
        VALUES('${name}', '${year}', '${category}'})
      `)
      console.log('result POST',result)

      // maybe we need to send feedback if entry is duplicate or whatever
      return res.json({});
    };
  } 
  catch(e) {
    console.log('error ', e);
    return res.status(500).send(e.message);
  };

};
