Prisma terminal commands for running migrations:

npx prisma generate
- whenever you make changes in database that are reflected in your Prisma schema, run this command

AFTER CHANGING THE DATA MOODEL:
npx prisma migrate dev --name [whatever you want to call it, no quotes or anything]
- this starts a history / chain of migrations

https://www.prisma.io/docs/concepts/components/prisma-migrate
