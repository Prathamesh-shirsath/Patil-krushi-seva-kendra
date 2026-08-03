import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

const brands = [
  "Bayer Crop Science",
  "BASF Agricultural Solutions",
  "UPL Limited",
  "Syngenta",
  "FMC Corporation",
  "Corteva Agriscience",
  "Sumitomo Chemical",
  "PI Industries",
  "IFFCO",
  "Coromandel International",
  "Rallis India",
  "Dhanuka Agritech",
  "Crystal Crop Protection",
  "Indofil Industries",
  "NACL Industries",
  "Godrej Agrovet",
  "Mahyco",
  "Bioseed",
  "Kaveri Seeds",
  "JK Agri Genetics"
];

async function main() {
  console.log("🌱 Seeding Brands...");

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: {
        slug: slugify(brand, { lower: true, strict: true }),
      },
      update: {},
      create: {
        name: brand,
        slug: slugify(brand, { lower: true, strict: true }),
        status: true,
      },
    });
  }

  console.log("✅ Brands Seeded Successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });