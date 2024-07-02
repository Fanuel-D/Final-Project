/*
  Warnings:

  - The primary key for the `AskMeLater` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Reflection` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "AskMeLater" DROP CONSTRAINT "AskMeLater_fileId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_fileId_fkey";

-- DropForeignKey
ALTER TABLE "Reflection" DROP CONSTRAINT "Reflection_fileId_fkey";

-- AlterTable
ALTER TABLE "AskMeLater" DROP CONSTRAINT "AskMeLater_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "fileId" SET DATA TYPE TEXT,
ADD CONSTRAINT "AskMeLater_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "File" DROP CONSTRAINT "File_pkey",
ALTER COLUMN "fileId" SET DATA TYPE TEXT,
ADD CONSTRAINT "File_pkey" PRIMARY KEY ("fileId");

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "fileId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Reflection" DROP CONSTRAINT "Reflection_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "fileId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Reflection_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reflection" ADD CONSTRAINT "Reflection_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AskMeLater" ADD CONSTRAINT "AskMeLater_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;
