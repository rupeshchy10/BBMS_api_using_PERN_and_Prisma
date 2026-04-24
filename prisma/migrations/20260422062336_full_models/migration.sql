/*
  Warnings:

  - Added the required column `status` to the `BloodTestReport` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'REJECTED');

-- AlterTable
ALTER TABLE "BloodRequest" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "BloodTestReport" ADD COLUMN     "status" "ReportStatus" NOT NULL;

-- AddForeignKey
ALTER TABLE "BloodRequest" ADD CONSTRAINT "BloodRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
