/*
  Warnings:

  - You are about to drop the column `shortDescription` on the `ChargingPoints` table. All the data in the column will be lost.
  - Added the required column `status` to the `ChargingPoints` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChargingPointsStatus" AS ENUM ('FREE', 'BUSY');

-- AlterTable
ALTER TABLE "ChargingPoints" DROP COLUMN "shortDescription",
ADD COLUMN     "status" "ChargingPointsStatus" NOT NULL;
