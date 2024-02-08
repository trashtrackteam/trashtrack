-- CreateTable
CREATE TABLE "SubTrashBin" (
    "id" SERIAL NOT NULL,
    "trashBinId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "maxCapacity" DOUBLE PRECISION NOT NULL,
    "currentCapacity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubTrashBin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubTrashBin" ADD CONSTRAINT "SubTrashBin_trashBinId_fkey" FOREIGN KEY ("trashBinId") REFERENCES "TrashBin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
