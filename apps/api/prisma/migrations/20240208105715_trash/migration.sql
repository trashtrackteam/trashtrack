-- CreateTable
CREATE TABLE "Trash" (
    "id" SERIAL NOT NULL,
    "subTrashBinId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trash_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trash" ADD CONSTRAINT "Trash_subTrashBinId_fkey" FOREIGN KEY ("subTrashBinId") REFERENCES "SubTrashBin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
