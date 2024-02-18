-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_reportId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_subTrashBinId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_trashBinId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_userId_fkey";

-- DropForeignKey
ALTER TABLE "SubTrashBin" DROP CONSTRAINT "SubTrashBin_trashBinId_fkey";

-- DropForeignKey
ALTER TABLE "Trash" DROP CONSTRAINT "Trash_subTrashBinId_fkey";

-- AddForeignKey
ALTER TABLE "SubTrashBin" ADD CONSTRAINT "SubTrashBin_trashBinId_fkey" FOREIGN KEY ("trashBinId") REFERENCES "TrashBin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trash" ADD CONSTRAINT "Trash_subTrashBinId_fkey" FOREIGN KEY ("subTrashBinId") REFERENCES "SubTrashBin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_subTrashBinId_fkey" FOREIGN KEY ("subTrashBinId") REFERENCES "SubTrashBin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_trashBinId_fkey" FOREIGN KEY ("trashBinId") REFERENCES "TrashBin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
