-- CreateEnum
CREATE TYPE "BannerScopeType" AS ENUM ('GLOBAL', 'CATEGORY', 'BRAND');

-- AlterEnum
ALTER TYPE "BannerPlacement" ADD VALUE 'CONTACT_HERO';

-- AlterTable
ALTER TABLE "Banner"
ADD COLUMN "scopeType" "BannerScopeType" NOT NULL DEFAULT 'GLOBAL',
ADD COLUMN "scopeSlug" TEXT;
