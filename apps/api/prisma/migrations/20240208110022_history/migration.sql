-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "subTrashBinId" INTEGER NOT NULL,
    "maxCapacity" DOUBLE PRECISION NOT NULL,
    "currentCapacity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_subTrashBinId_fkey" FOREIGN KEY ("subTrashBinId") REFERENCES "SubTrashBin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
