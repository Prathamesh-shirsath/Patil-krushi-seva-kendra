-- CreateEnum
CREATE TYPE "StatisticPlacement" AS ENUM ('HOME', 'ABOUT', 'FOOTER');

-- CreateTable
CREATE TABLE "Statistic" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "color" TEXT DEFAULT 'green',
    "placement" "StatisticPlacement" NOT NULL DEFAULT 'HOME',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Statistic_pkey" PRIMARY KEY ("id")
);
