/*
  Warnings:

  - Added the required column `minutesToBeUsed` to the `ChargingOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChargingOrder" ADD COLUMN     "minutesToBeUsed" DECIMAL(65,30) NOT NULL;
