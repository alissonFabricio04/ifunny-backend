-- AlterEnum
ALTER TYPE "ChargingPointsStatus" ADD VALUE 'UNDER_CONSTRUCTION';

-- DropIndex
DROP INDEX "ChargingPoints_fk_admin_key";
