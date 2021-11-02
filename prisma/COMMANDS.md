Prisma terminal commands for running migrations:

To generate the schema:
npx prisma generate

AFTER CHANGING THE DATA MODEL:
npx prisma migrate dev --name whatever_you_want_to_name_it
- this starts a history / chain of migrations

https://www.prisma.io/docs/concepts/components/prisma-migrate
