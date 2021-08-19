import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';
import prisma from '../../../lib/prisma';

// https://www.youtube.com/watch?v=o_wZIVmWteQ
// https://github.com/nextauthjs/next-auth/blob/main/src/providers/email.js
// https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes-auth/pages/api/post/%5Bid%5D.ts

const options = {
    providers: [
        // Passwordless / email sign in
        Providers.Email({
            // Server can be an SMTP connection string or a nodemailer config object
            // server: process.env.MAIL_SERVER,
            // Can put all these into process.env
            server: {
                host: 'localhost',
                port: 25,
                auth: {
                    user: '',
                    pass: '',
                    email: '',
                },
            },
            from: 'NextAuth.js <no-reply@example.com>',
            maxAge: 24 * 60 * 60,
            session: { jwt: {} },
        }),
    ],
    // https://next-auth.js.org/tutorials/creating-a-database-adapter
    adapter: Adapters.Prisma.Adapter({ prisma }),
    secret: process.env.SECRET,
    database: process.env.DATABASE_URL,
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
