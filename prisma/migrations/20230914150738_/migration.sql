/*
  Warnings:

  - You are about to drop the column `fk_user` on the `Admins` table. All the data in the column will be lost.
  - You are about to drop the column `fk_user` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `fk_user` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[fk_client]` on the table `Admins` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fk_client` to the `Admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_client` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_client` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Admins" DROP CONSTRAINT "Admins_fk_user_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_fk_user_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_fk_user_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_fk_wallet_fkey";

-- DropIndex
DROP INDEX "Admins_fk_user_key";

-- AlterTable
ALTER TABLE "Admins" DROP COLUMN "fk_user",
ADD COLUMN     "fk_client" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "fk_user",
ADD COLUMN     "fk_client" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "fk_user",
ADD COLUMN     "fk_client" TEXT NOT NULL;

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "surname" VARCHAR(100) NOT NULL,
    "documentId" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_wallet" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_documentId_key" ON "Client"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_telephone_key" ON "Client"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_fk_wallet_key" ON "Client"("fk_wallet");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_fk_client_key" ON "Admins"("fk_client");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_fk_wallet_fkey" FOREIGN KEY ("fk_wallet") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_fk_client_fkey" FOREIGN KEY ("fk_client") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_fk_client_fkey" FOREIGN KEY ("fk_client") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_fk_client_fkey" FOREIGN KEY ("fk_client") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
