/*
  Warnings:

  - You are about to drop the column `createdOn` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedOn` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Tax" AS ENUM ('0%', '7%', '20%');

-- CreateEnum
CREATE TYPE "TypeCustomer" AS ENUM ('individual entrepreneur', 'limited liability company');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdOn",
DROP COLUMN "updatedOn",
ADD COLUMN     "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "individual_tax_number" TEXT NOT NULL,
    "tax" "Tax" NOT NULL DEFAULT '0%',
    "email" TEXT,
    "phone" TEXT,
    "comment" TEXT,
    "type" "TypeCustomer" NOT NULL DEFAULT 'individual entrepreneur',
    "inactive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_name_key" ON "Customer"("name");
