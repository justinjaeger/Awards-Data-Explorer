import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface Global {
            prisma: unknown;
        }
    }
}

//@ts-ignore
const prisma: PrismaClient = (() => {
    if (process.env.NODE_ENV === 'production') {
        return new PrismaClient();
    }
    // helps not exhaust db connection limit in development
    // https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    return global.prisma;
})();

export default prisma;
