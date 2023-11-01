/*
  Warnings:

  - You are about to alter the column `latitude` on the `ChargingPoints` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,20)` to `Integer`.
  - You are about to alter the column `longitude` on the `ChargingPoints` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "ChargingPoints" ALTER COLUMN "latitude" SET DATA TYPE INTEGER,
ALTER COLUMN "longitude" SET DATA TYPE INTEGER;
