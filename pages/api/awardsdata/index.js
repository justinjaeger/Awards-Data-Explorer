const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);


export default async (req, res) => {

  /* req.body: {
    fields : [ "AwardsShow", "Year" ],
    maxRecords: 6,
    filterByFormula: "AND(AwardsShow='PGA', Category='Best Picture')",
    sort: null
  } */

  const result = await new Promise(async (resolve, reject) => {
    // create starter object with all fields
    const starter = {
      view: "Grid view",
      fields: req.body.fields,
      maxRecords: req.body.maxRecords,
      filterByFormula: req.body.filterByFormula,
      sort: req.body.sort,
    };
    // create new object that filters out fields if null
    const selection = {};
    for (const [key, value] of Object.entries(starter)) {
      if (value !== null) {
        selection[key] = value;
      };
    };

    const output = [];
    base('Nominees')
      .select(selection)
      // each page is 100 records - page() is called for each batch
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(record => {
            // push record fields to output
            output.push(record.fields);
          });
          // Fetch the next page of records if there is one
          fetchNextPage();
        }, 
        function done(err) {
          console.log('output',output)
          if (err) reject(err)
          else resolve(output);
        });
  });
  return res.json(result)
};
