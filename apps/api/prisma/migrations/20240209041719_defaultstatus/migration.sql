/*
  Warnings:

  - Made the column `description` on table `Report` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 0;
