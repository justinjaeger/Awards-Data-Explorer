### With our TWO schemas / databases
https://www.prisma.io/docs/concepts/components/prisma-migrate

# GENERATE
npx prisma generate --schema prisma/userSchema.prisma
npx prisma generate --schema prisma/awardsSchema.prisma

# MIGRATION - Whenever we alter the data model
npx prisma migrate dev --schema prisma/userSchema.prisma --name initial_migration
npx prisma migrate dev --schema prisma/awardsSchema.prisma --name initial_migration
