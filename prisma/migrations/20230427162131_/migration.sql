/*
  Warnings:

  - You are about to drop the column `statusOrderId` on the `ChargingPoints` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChargingOrder" DROP CONSTRAINT "ChargingOrder_userId_fkey";

-- DropForeignKey
ALTER TABLE "ChargingPoints" DROP CONSTRAINT "ChargingPoints_payementMethodId_fkey";

-- DropForeignKey
ALTER TABLE "ChargingPoints" DROP CONSTRAINT "ChargingPoints_statusOrderId_fkey";

-- DropForeignKey
ALTER TABLE "ChargingPoints" DROP CONSTRAINT "ChargingPoints_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_walletId_fkey";

-- AlterTable
ALTER TABLE "ChargingPoints" DROP COLUMN "statusOrderId",
ALTER COLUMN "payementMethodId" DROP NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "walletId" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admins" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_walletId_key" ON "Users"("walletId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChargingOrder" ADD CONSTRAINT "ChargingOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChargingPoints" ADD CONSTRAINT "ChargingPoints_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChargingPoints" ADD CONSTRAINT "ChargingPoints_payementMethodId_fkey" FOREIGN KEY ("payementMethodId") REFERENCES "PayementMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;
