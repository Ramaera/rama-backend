-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "KYC" AS ENUM ('NOT_INITIALIZED', 'SUBMITTED', 'ONGOING', 'REJECTED', 'APPROVED');

-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('NOT_INITILAIZED', 'PENDING', 'SUBMITTED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "father_or_husband_name" TEXT,
    "Mobile_Number" TEXT,
    "Alternate_Mobile_number" TEXT,
    "kyc" "KYC" NOT NULL DEFAULT 'NOT_INITIALIZED',
    "role" "Role" NOT NULL,
    "DOB" TEXT,
    "Demat_Account" TEXT,
    "Private_Key" TEXT,
    "pw_id" TEXT,
    "RM_id" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "authorId" TEXT,
    "status" "STATUS" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_pw_id_key" ON "User"("pw_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_RM_id_key" ON "User"("RM_id");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
