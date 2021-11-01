import { PrismaClient as PrismaClientUser } from '../prisma/user';
// import { PrismaClient as PrismaClientAwards } from '../prisma/awards';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
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
const prisma_user: PrismaClientUser = (() => {
    if (process.env.NODE_ENV === 'production') {
        return new PrismaClientUser();
    }
    // helps not exhaust db connection limit in development
    // https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
    if (!global.prisma) {
        global.prisma = new PrismaClientUser();
    }
    return global.prisma;
})();

//@ts-ignore
// const prisma_awards: PrismaClientAwards = (() => {
//     if (process.env.NODE_ENV === 'production') {
//         return new PrismaClientAwards();
//     }
//     // helps not exhaust db connection limit in development
//     // https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
//     if (!global.prisma) {
//         global.prisma = new PrismaClientAwards();
//     }
//     return global.prisma;
// })();

const Prisma = {
    User: prisma_user,
    // Awards: prisma_awards,
};

export default Prisma;
