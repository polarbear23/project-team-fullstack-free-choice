/*
  Warnings:

  - Added the required column `competitorId` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "competitorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "Competitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
