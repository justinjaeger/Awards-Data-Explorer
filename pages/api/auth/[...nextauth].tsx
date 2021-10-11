import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';
import prisma from '../../../lib/prisma';

// https://www.youtube.com/watch?v=o_wZIVmWteQ
// https://github.com/nextauthjs/next-auth/blob/main/src/providers/email.js
// https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes-auth/pages/api/post/%5Bid%5D.ts
// https://next-auth.js.org/tutorials/creating-a-database-adapter

/**
 * The email provider sends you a magic link to sign in or sign up users
 */
const options = {
    providers: [
        Providers.Email({
            server: process.env.SMTP_SERVER,
            from: process.env.SMTP_FROM,
        }),
    ],
    adapter: Adapters.Prisma.Adapter({ prisma }),
    secret: process.env.SECRET,
    database: process.env.DATABASE_URL,
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
