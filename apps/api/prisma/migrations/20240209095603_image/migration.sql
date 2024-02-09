/*
  Warnings:

  - You are about to drop the column `imagePath` on the `Report` table. All the data in the column will be lost.
  - Added the required column `imageData` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageName` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "imagePath",
ADD COLUMN     "imageData" BYTEA NOT NULL,
ADD COLUMN     "imageName" TEXT NOT NULL;
