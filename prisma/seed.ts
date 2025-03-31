import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Hash password
  const adminPassword = await bcrypt.hash("admin123", 10);

  // Upsert admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@tarot.com" },
    update: {}, // No update data, only create if not exists
    create: {
      name: "Admin User",
      email: "admin@tarot.com",
      password: adminPassword,
      role: "ADMIN", // Ensure 'role' exists in Prisma schema
    },
  });

  console.log("✅ Admin user upserted:", admin);
  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
