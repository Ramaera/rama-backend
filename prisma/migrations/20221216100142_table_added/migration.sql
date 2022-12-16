/*
  Warnings:

  - The required column `id` was added to the `Nominee` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Nominee" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Nominee_pkey" PRIMARY KEY ("id");
