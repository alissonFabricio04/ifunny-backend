/*
  Warnings:

  - You are about to drop the column `payementMethodId` on the `ChargingPoints` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ChargingPoints` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Admins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[adminId]` on the table `ChargingPoints` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminId` to the `ChargingPoints` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChargingPoints" DROP CONSTRAINT "ChargingPoints_payementMethodId_fkey";

-- DropForeignKey
ALTER TABLE "ChargingPoints" DROP CONSTRAINT "ChargingPoints_userId_fkey";

-- DropIndex
DROP INDEX "ChargingPoints_userId_key";

-- AlterTable
ALTER TABLE "ChargingPoints" DROP COLUMN "payementMethodId",
DROP COLUMN "userId",
ADD COLUMN     "adminId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admins_userId_key" ON "Admins"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChargingPoints_adminId_key" ON "ChargingPoints"("adminId");

-- AddForeignKey
ALTER TABLE "ChargingPoints" ADD CONSTRAINT "ChargingPoints_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
