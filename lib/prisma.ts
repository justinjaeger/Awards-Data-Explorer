import { PrismaClient } from '@prisma/client'

declare global {
    namespace NodeJS {
        interface Global {
            prisma: any;
        }
    }
}

const prisma: PrismaClient = (() => {
    if (process.env.NODE_ENV === 'production') {
        return new PrismaClient()
    } else {
        // helps not exhaust db connection limit in development
        // https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
        if (!global.prisma) {
            global.prisma = new PrismaClient()
        }
        return global.prisma
    }
})();

export default prisma;
