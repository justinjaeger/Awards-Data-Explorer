import db from '../../../../lib/db';

/**
 * Admin actions on rank_category
 */

export default async (req, res) => {

  let result;

  const { 
    method,
    body: { year, category, awardsShow },
  } = req;

  try {

    // POST: Create new category
    if (method==='POST') {
      result = await db.query(`
        INSERT INTO rank_category (year, category, awardsShow)
        VALUES ('${year}','${category}','${awardsShow}')
      `)
      if (result.error) {
        throw result.error;
      };
      return res.status(200).send('Success creating category');
    };

    // PUT: Archive/unarchive category
    if (method==='PUT') {
      result = await db.query(`
        UPDATE rank_category
        SET archived = archived ^ 1
        WHERE year='${year}'
        AND category='${category}'
        AND awardsShow='${awardsShow}'
      `)
      if (result.error) {
        throw result.error;
      };
      return res.status(200).send('Success archiving category');
    };

    // DELETE: remove category
    if (method==='DELETE') {
      // TBC
    };

  }
  catch(e) {
    console.log('error ', e);
    return res.status(500).send(e.message);
  };

};
