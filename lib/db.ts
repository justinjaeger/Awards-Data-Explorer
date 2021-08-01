import mysql from 'serverless-mysql';

const db = (() => {
    switch (process.env.APP_ENV) {
        case "local":
            return mysql({
                config: {
                    host: process.env.MYSQL_HOST,
                    database: process.env.MYSQL_DATABASE,
                    user: process.env.MYSQL_USER,
                    password: process.env.MYSQL_PASSWORD,
                },
            });
        case "remote":
            return mysql({
                config: {
                    host: process.env.DO_HOST,
                    database: process.env.DO_DATABASE,
                    user: process.env.DO_USER,
                    password: process.env.DO_PASSWORD,
                    //@ts-ignore
                    port: process.env.DO_PORT,
                },
            });
    }
})();

export default {
    query: async (query) => {
        try {
            const results = await db.query(query);
            await db.end();
            return results;
        } catch (error) {
            return { error };
        }
    }
}

// switch (process.env.APP_ENV) {
//     case "local":
//         db = mysql({
//             config: {
//                 host: process.env.MYSQL_HOST,
//                 database: process.env.MYSQL_DATABASE,
//                 user: process.env.MYSQL_USER,
//                 password: process.env.MYSQL_PASSWORD,
//             },
//         });
//     case "remote":
//         db = mysql({
//             config: {
//                 host: process.env.DO_HOST,
//                 database: process.env.DO_DATABASE,
//                 user: process.env.DO_USER,
//                 password: process.env.DO_PASSWORD,
//                 //@ts-ignore
//                 port: process.env.DO_PORT,
//             },
//         });
// }

// exports.query = async (query) => {
//     try {
//         const results = await db.query(query);
//         await db.end();
//         return results;
//     } catch (error) {
//         return { error };
//     }
// };
