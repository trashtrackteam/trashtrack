-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "trashBinId" INTEGER NOT NULL,
    "userId" INTEGER,
    "nik" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "description" TEXT,
    "status" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_trashBinId_fkey" FOREIGN KEY ("trashBinId") REFERENCES "TrashBin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
