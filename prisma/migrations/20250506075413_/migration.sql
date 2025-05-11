/*
  Warnings:

  - The primary key for the `ErrorLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Logo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `QRCode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `QrCodeController` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[uuid]` on the table `QRCode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `QRCode` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QRCode" DROP CONSTRAINT "QRCode_logoId_fkey";

-- DropForeignKey
ALTER TABLE "QrCodeController" DROP CONSTRAINT "QrCodeController_qrCodeId_fkey";

-- AlterTable
ALTER TABLE "ErrorLog" DROP CONSTRAINT "ErrorLog_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ErrorLog_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ErrorLog_id_seq";

-- AlterTable
ALTER TABLE "Logo" DROP CONSTRAINT "Logo_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Logo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Logo_id_seq";

-- AlterTable
ALTER TABLE "QRCode" DROP CONSTRAINT "QRCode_pkey",
ADD COLUMN     "uuid" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "logoId" SET DATA TYPE TEXT,
ADD CONSTRAINT "QRCode_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "QRCode_id_seq";

-- AlterTable
ALTER TABLE "QrCodeController" DROP CONSTRAINT "QrCodeController_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "qrCodeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "QrCodeController_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "QrCodeController_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "QRCode_uuid_key" ON "QRCode"("uuid");

-- AddForeignKey
ALTER TABLE "QRCode" ADD CONSTRAINT "QRCode_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "Logo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrCodeController" ADD CONSTRAINT "QrCodeController_qrCodeId_fkey" FOREIGN KEY ("qrCodeId") REFERENCES "QRCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
