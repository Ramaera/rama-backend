/*
  Warnings:

  - The `RM_id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "User_RM_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "RM_id",
ADD COLUMN     "RM_id" SERIAL;
