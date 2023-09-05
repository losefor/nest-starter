import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import * as bcrypt from 'bcrypt';

async function main() {
  // Your seed data goes here
  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      permission: {
        create: {
          uniqueName: 'ADMIN',
          name: {
            create: {
              en: 'Admin',
              ar: 'ادمن',
              ckb: 'ادمن',
            },
          },
          Image: 'crud',
        },
      },
      password: await bcrypt.hash('admin', 12),
      username: 'admin',
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
