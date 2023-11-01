/*
  Warnings:

  - You are about to alter the column `latitude` on the `ChargingPoints` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - You are about to alter the column `longitude` on the `ChargingPoints` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.

*/
-- AlterTable
ALTER TABLE "ChargingPoints" ALTER COLUMN "latitude" SET DATA TYPE REAL,
ALTER COLUMN "longitude" SET DATA TYPE REAL;
