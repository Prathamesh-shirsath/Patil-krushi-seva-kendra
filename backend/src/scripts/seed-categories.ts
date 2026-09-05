import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function seedCategories() {
  const filePath = path.join(__dirname, "../data/categories.json");

  console.log(`📂 Reading categories from: ${filePath}`);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(filePath, "utf-8");
  const categories = JSON.parse(rawData);

  if (!Array.isArray(categories)) {
    console.error("❌ Invalid format: categories.json must contain an array.");
    process.exit(1);
  }

  console.log(`🌱 Seeding ${categories.length} categories...`);

  for (const cat of categories) {
    if (!cat.name || !cat.slug) {
      console.warn(`⚠️ Skipping invalid category item:`, cat);
      continue;
    }

    const result = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        image: cat.image || null,
        status: typeof cat.status === "boolean" ? cat.status : true,
        ...(cat.parentId ? { parentId: cat.parentId } : {}),
      },
      create: {
        ...(cat.id ? { id: cat.id } : {}),
        name: cat.name,
        slug: cat.slug,
        image: cat.image || null,
        status: typeof cat.status === "boolean" ? cat.status : true,
        ...(cat.parentId ? { parentId: cat.parentId } : {}),
      },
    });

    console.log(`  ✓ ${result.name} (slug: ${result.slug})`);
  }

  console.log("✅ Categories seeded successfully from categories.json!");
}

seedCategories()
  .catch((err) => {
    console.error("❌ Error seeding categories:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
