/*
  Warnings:

  - You are about to drop the column `userId` on the `BloodRequest` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "ReportStatus" ADD VALUE 'APPROVED';

-- DropForeignKey
ALTER TABLE "BloodRequest" DROP CONSTRAINT "BloodRequest_userId_fkey";

-- AlterTable
ALTER TABLE "BloodRequest" DROP COLUMN "userId",
ADD COLUMN     "requesterId" TEXT;

-- AddForeignKey
ALTER TABLE "BloodRequest" ADD CONSTRAINT "BloodRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
