Prisma terminal commands for running migrations:

npx prisma generate
- whenever you make changes in database that are reflected in your Prisma schema, run this command

npx prisma migrate dev --name [whatever you want to call it]
- this starts a history / chain of migrations