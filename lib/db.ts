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

// We can typecast this as "any" in order to not get 1000 unknown type errors when accessing this
// But let's take that out later when we have Prisma set up
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
} as any

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
