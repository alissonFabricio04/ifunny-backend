/*
  Warnings:

  - A unique constraint covering the columns `[latitude]` on the table `ChargingPoints` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[longitude]` on the table `ChargingPoints` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChargingPoints_latitude_key" ON "ChargingPoints"("latitude");

-- CreateIndex
CREATE UNIQUE INDEX "ChargingPoints_longitude_key" ON "ChargingPoints"("longitude");
