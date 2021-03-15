const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

/* RESOLVERS */

export const resolvers = {
  Query: {
    // Get user by ID
    getNominees: async (_, args) => {
      // return new Promise( async (resolve, reject) => {
        const output = [];
        base('Nominees')
        .select({
          fields: ["AwardsShow"],
          view: "Grid view",
          maxRecords: 3, // make this dynamic later
          // filterByFormula: (dynamic),
          // sort: [{field:'x',direction:'asc'},{}],
        })
        // each page is 100 records
        .eachPage(function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.
          records.forEach(record => {
            console.log('record',record.fields)
            // console.log('record',record._rawJson.fields)
            // push the ID to the output
            output.push(record.getId());
          });
          // Fetch the next page of records
          fetchNextPage();
        }, function done(err) {
            return output;
            // if (err) reject(err)
            // else resolve(output);
        });
        // return [{film:'ass'}]
      // });
    },
  }
};