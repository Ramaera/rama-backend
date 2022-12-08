/*
  Warnings:

  - You are about to drop the column `authorId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `Alternate_Mobile_number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `DOB` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Demat_Account` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Mobile_Number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pw_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Private_Key` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `RM_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pw_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rm_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_authorId_fkey";

-- DropIndex
DROP INDEX "User_pw_id_key";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "authorId",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Alternate_Mobile_number",
DROP COLUMN "DOB",
DROP COLUMN "Demat_Account",
DROP COLUMN "Mobile_Number",
DROP COLUMN "pw_id",
DROP COLUMN "Private_Key",
DROP COLUMN "RM_id",
ADD COLUMN     "alternate_mobile_number" TEXT,
ADD COLUMN     "date_of_birth" TEXT,
ADD COLUMN     "demat_account" TEXT,
ADD COLUMN     "mobile_number" TEXT,
ADD COLUMN     "private_key" TEXT,
ADD COLUMN     "pw_id" TEXT,
ADD COLUMN     "rm_id" TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_pw_id_key" ON "User"("pw_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_rm_id_key" ON "User"("rm_id");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
