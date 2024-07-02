/*
  Warnings:

  - You are about to drop the column `username` on the `File` table. All the data in the column will be lost.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `File` table without a default value. This is not possible if the table is not empty.
  - The required column `userId` was added to the `Users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_username_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "username",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
