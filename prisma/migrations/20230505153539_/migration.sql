/*
  Warnings:

  - A unique constraint covering the columns `[fk_admin]` on the table `ChargingPoints` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[status]` on the table `OrderStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[checkout_url]` on the table `Payments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Order_fk_user_key";

-- CreateIndex
CREATE UNIQUE INDEX "ChargingPoints_fk_admin_key" ON "ChargingPoints"("fk_admin");

-- CreateIndex
CREATE UNIQUE INDEX "OrderStatus_status_key" ON "OrderStatus"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_checkout_url_key" ON "Payments"("checkout_url");
