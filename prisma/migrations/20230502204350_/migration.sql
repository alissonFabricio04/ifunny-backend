/*
  Warnings:

  - You are about to alter the column `latitude` on the `ChargingPoints` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,20)`.

*/
-- AlterTable
ALTER TABLE "ChargingPoints" ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(20,20);
