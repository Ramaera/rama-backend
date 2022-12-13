-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Membership" AS ENUM ('BASIC', 'ADVANCE');

-- CreateEnum
CREATE TYPE "KYC" AS ENUM ('NOT_INITIALIZED', 'SUBMITTED', 'ONGOING', 'REJECTED', 'APPROVED');

-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('NOT_INITILAIZED', 'PENDING', 'SUBMITTED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "father_or_husband_name" TEXT,
    "mobile_number" TEXT,
    "alternate_mobile_number" TEXT,
    "kyc" "KYC" NOT NULL DEFAULT 'NOT_INITIALIZED',
    "role" "Role" NOT NULL,
    "membership" "Membership" NOT NULL DEFAULT 'BASIC',
    "date_of_birth" TEXT,
    "demat_account" TEXT,
    "private_key" TEXT,
    "pw_id" TEXT,
    "rm_id" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT,
    "status" "STATUS" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_pw_id_key" ON "User"("pw_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_rm_id_key" ON "User"("rm_id");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
