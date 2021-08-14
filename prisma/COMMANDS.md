Prisma terminal commands for running migrations:

npx prisma generate
- whenever you make changes in database that are reflected in your Prisma schema, run this command

AFTER CHANGING THE DATA MOODEL:
npx prisma migrate dev --name whatever_you_want_to_name_it
- this starts a history / chain of migrations

https://www.prisma.io/docs/concepts/components/prisma-migrate
