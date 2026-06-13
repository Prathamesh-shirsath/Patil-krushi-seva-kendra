import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

async function seedAdmin() {
  const hashedPassword = await bcrypt.hash("admin@pks1212", 10);

  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: "ps20040603@gmail.com",
    },
  });

  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

  await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "ps20040603@gmail.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin created successfully");
}

seedAdmin()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });