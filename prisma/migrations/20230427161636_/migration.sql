-- AlterTable
ALTER TABLE "ChargingOrder" ADD COLUMN     "chargingPointId" TEXT;

-- CreateTable
CREATE TABLE "ChargingPoints" (
    "id" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "payementMethodId" TEXT NOT NULL,
    "statusOrderId" TEXT NOT NULL,

    CONSTRAINT "ChargingPoints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChargingPoints_userId_key" ON "ChargingPoints"("userId");

-- AddForeignKey
ALTER TABLE "ChargingOrder" ADD CONSTRAINT "ChargingOrder_chargingPointId_fkey" FOREIGN KEY ("chargingPointId") REFERENCES "ChargingPoints"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChargingPoints" ADD CONSTRAINT "ChargingPoints_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChargingPoints" ADD CONSTRAINT "ChargingPoints_payementMethodId_fkey" FOREIGN KEY ("payementMethodId") REFERENCES "PayementMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChargingPoints" ADD CONSTRAINT "ChargingPoints_statusOrderId_fkey" FOREIGN KEY ("statusOrderId") REFERENCES "StatusOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
