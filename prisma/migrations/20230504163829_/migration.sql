/*
  Warnings:

  - Changed the type of `subtotal` on the `Payments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "subtotal",
ADD COLUMN     "subtotal" DECIMAL(65,30) NOT NULL;
