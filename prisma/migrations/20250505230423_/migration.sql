/*
  Warnings:

  - The `type` column on the `QRCode` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `LogoImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "QrCodeType" AS ENUM ('link', 'wifi', 'text', 'email', 'phone');

-- DropForeignKey
ALTER TABLE "LogoImage" DROP CONSTRAINT "LogoImage_userId_fkey";

-- DropForeignKey
ALTER TABLE "QRCode" DROP CONSTRAINT "QRCode_logoId_fkey";

-- AlterTable
ALTER TABLE "QRCode" DROP COLUMN "type",
ADD COLUMN     "type" "QrCodeType" NOT NULL DEFAULT 'text';

-- DropTable
DROP TABLE "LogoImage";

-- CreateTable
CREATE TABLE "Logo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Logo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QRCode" ADD CONSTRAINT "QRCode_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "Logo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logo" ADD CONSTRAINT "Logo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
