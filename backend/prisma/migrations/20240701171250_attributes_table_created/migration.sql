-- CreateTable
CREATE TABLE "File" (
    "fileId" INTEGER NOT NULL,
    "fileName" TEXT NOT NULL,
    "favoriteFlag" BOOLEAN NOT NULL,
    "fileDetails" JSONB NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("fileId")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL,
    "questionText" TEXT NOT NULL,
    "questionAnswer" TEXT NOT NULL,
    "fileId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reflection" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fileId" INTEGER NOT NULL,

    CONSTRAINT "Reflection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AskMeLater" (
    "id" INTEGER NOT NULL,
    "questionText" TEXT NOT NULL,
    "questionAnswer" TEXT NOT NULL,
    "fileId" INTEGER NOT NULL,

    CONSTRAINT "AskMeLater_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_username_fkey" FOREIGN KEY ("username") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reflection" ADD CONSTRAINT "Reflection_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AskMeLater" ADD CONSTRAINT "AskMeLater_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("fileId") ON DELETE RESTRICT ON UPDATE CASCADE;
