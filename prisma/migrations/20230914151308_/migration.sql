/*
  Warnings:

  - You are about to drop the column `fk_wallet` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_fk_wallet_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_fk_charging_point_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_fk_client_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_fk_order_status_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_fk_payment_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_payment_status_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_payment_type_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_fk_client_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_fk_wallet_fkey";

-- DropIndex
DROP INDEX "Client_fk_wallet_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "fk_wallet";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderStatus";

-- DropTable
DROP TABLE "PaymentStatus";

-- DropTable
DROP TABLE "PaymentType";

-- DropTable
DROP TABLE "Payments";

-- DropTable
DROP TABLE "Transactions";

-- DropTable
DROP TABLE "Wallet";
