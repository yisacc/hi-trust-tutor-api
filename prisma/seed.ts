import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/modules/auth";
const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      firstname: "Yisacc",
      lastname: "Aberham",
      password: await hashPassword("Abcd@1234"),
      username: "Yisacc",
      role: {
        create: {
          name: "Admin",
          isAdmin: true,
          permissions: {
            create: {
              name: "Add user",
              code: "Add user",
              description: "can add new user",
            },
          },
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: "test@gmail.com" },
    update: {},
    create: {
      email: "test@gmail.com",
      firstname: "Test",
      lastname: "Test",
      password: await hashPassword("Abcd@1234"),
      username: "Test",
      role: {
        create: {
          name: "User",
          isAdmin: false,
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
