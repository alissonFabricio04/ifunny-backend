/*
  Warnings:

  - You are about to drop the column `userId` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `ChargingPoints` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `walletId` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `walletId` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `ChargingOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PayementMethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StatusOrder` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[fk_user]` on the table `Admins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fk_admin]` on the table `ChargingPoints` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[documentId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telephone]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fk_wallet]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fk_user` to the `Admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `ChargingPoints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `ChargingPoints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `ChargingPoints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_admin` to the `ChargingPoints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `ChargingPoints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `ChargingPoints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_user` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_wallet` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentId` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_wallet` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Admins" DROP CONSTRAINT "Admins_userId_fkey";

-- DropForeignKey
ALTER TABLE "ChargingOrder" DROP CONSTRAINT "ChargingOrder_chargingPointId_fkey";

-- DropForeignKey
ALTER TABLE "ChargingOrder" DROP CONSTRAINT "ChargingOrder_payementMethodId_fkey";

-- DropForeignKey
ALTER TABLE "ChargingOrder" DROP CONSTRAINT "ChargingOrder_statusOrderId_fkey";

-- DropForeignKey
ALTER TABLE "ChargingOrder" DROP CONSTRAINT "ChargingOrder_userId_fkey";

-- DropForeignKey
ALTER TABLE "ChargingPoints" DROP CONSTRAINT "ChargingPoints_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_walletId_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_walletId_fkey";

-- DropIndex
DROP INDEX "Admins_userId_key";

-- DropIndex
DROP INDEX "ChargingPoints_adminId_key";

-- DropIndex
DROP INDEX "Users_walletId_key";

-- AlterTable
ALTER TABLE "Admins" DROP COLUMN "userId",
ADD COLUMN     "fk_user" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ChargingPoints" DROP COLUMN "adminId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "complement" TEXT,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "fk_admin" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "zip" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "userId",
DROP COLUMN "walletId",
ADD COLUMN     "fk_user" TEXT NOT NULL,
ADD COLUMN     "fk_wallet" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "name",
DROP COLUMN "walletId",
ADD COLUMN     "documentId" TEXT NOT NULL,
ADD COLUMN     "firstName" VARCHAR(100) NOT NULL,
ADD COLUMN     "fk_wallet" TEXT NOT NULL,
ADD COLUMN     "surname" VARCHAR(100) NOT NULL,
ADD COLUMN     "telephone" TEXT NOT NULL;

-- DropTable
DROP TABLE "ChargingOrder";

-- DropTable
DROP TABLE "PayementMethod";

-- DropTable
DROP TABLE "StatusOrder";

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "reserve" DECIMAL(65,30) NOT NULL,
    "reserve_expiration" TIMESTAMP(3) NOT NULL,
    "fk_user" TEXT NOT NULL,
    "fk_payment" TEXT NOT NULL,
    "fk_order_status" TEXT NOT NULL,
    "fk_charging_point" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderStatus" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "OrderStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payement" (
    "id" TEXT NOT NULL,
    "subtotal" TEXT NOT NULL,
    "payment_type" TEXT NOT NULL,
    "payment_status" TEXT NOT NULL,
    "checkout_url" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PaymentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PaymentStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_fk_user_key" ON "Order"("fk_user");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_fk_user_key" ON "Admins"("fk_user");

-- CreateIndex
CREATE UNIQUE INDEX "ChargingPoints_fk_admin_key" ON "ChargingPoints"("fk_admin");

-- CreateIndex
CREATE UNIQUE INDEX "Users_documentId_key" ON "Users"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_telephone_key" ON "Users"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Users_fk_wallet_key" ON "Users"("fk_wallet");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_fk_wallet_fkey" FOREIGN KEY ("fk_wallet") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChargingPoints" ADD CONSTRAINT "ChargingPoints_fk_admin_fkey" FOREIGN KEY ("fk_admin") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_fk_wallet_fkey" FOREIGN KEY ("fk_wallet") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_fk_payment_fkey" FOREIGN KEY ("fk_payment") REFERENCES "Payement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_fk_order_status_fkey" FOREIGN KEY ("fk_order_status") REFERENCES "OrderStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_fk_charging_point_fkey" FOREIGN KEY ("fk_charging_point") REFERENCES "ChargingPoints"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payement" ADD CONSTRAINT "Payement_payment_type_fkey" FOREIGN KEY ("payment_type") REFERENCES "PaymentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payement" ADD CONSTRAINT "Payement_payment_status_fkey" FOREIGN KEY ("payment_status") REFERENCES "PaymentStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
