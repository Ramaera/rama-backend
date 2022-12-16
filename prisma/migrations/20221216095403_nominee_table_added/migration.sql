/*
  Warnings:

  - You are about to drop the column `userPw_id` on the `Nominee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Nominee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Nominee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Nominee" DROP CONSTRAINT "Nominee_userPw_id_fkey";

-- DropIndex
DROP INDEX "Nominee_userPw_id_key";

-- AlterTable
ALTER TABLE "Nominee" DROP COLUMN "userPw_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Nominee_userId_key" ON "Nominee"("userId");

-- AddForeignKey
ALTER TABLE "Nominee" ADD CONSTRAINT "Nominee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
