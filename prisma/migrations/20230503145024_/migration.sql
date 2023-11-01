/*
  Warnings:

  - You are about to drop the `Payement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_fk_payment_fkey";

-- DropForeignKey
ALTER TABLE "Payement" DROP CONSTRAINT "Payement_payment_status_fkey";

-- DropForeignKey
ALTER TABLE "Payement" DROP CONSTRAINT "Payement_payment_type_fkey";

-- DropTable
DROP TABLE "Payement";

-- CreateTable
CREATE TABLE "Payments" (
    "id" TEXT NOT NULL,
    "subtotal" TEXT NOT NULL,
    "payment_type" TEXT NOT NULL,
    "payment_status" TEXT NOT NULL,
    "checkout_url" TEXT,
    "confimation_date" TIMESTAMP(3),
    "payload" JSONB,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_fk_payment_fkey" FOREIGN KEY ("fk_payment") REFERENCES "Payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_payment_type_fkey" FOREIGN KEY ("payment_type") REFERENCES "PaymentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_payment_status_fkey" FOREIGN KEY ("payment_status") REFERENCES "PaymentStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
