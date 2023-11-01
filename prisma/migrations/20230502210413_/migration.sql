/*
  Warnings:

  - You are about to alter the column `latitude` on the `ChargingPoints` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,10)` to `Decimal(10,2)`.
  - You are about to alter the column `longitude` on the `ChargingPoints` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,10)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "ChargingPoints" ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(10,2);
