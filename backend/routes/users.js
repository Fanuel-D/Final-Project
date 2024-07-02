const express = require("express");

const router = express.Router();
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//root route is users
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userFiles = await prisma.users.findUnique({
      where: { userId: userId },
      include: { files: true },
    });
    res.json(userFiles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/:userId/:fileId", async (req, res) => {
  const { userId, fileId } = req.params;
  try {
    const userFile = await prisma.file.findUnique({
      where: { fileId: fileId },
    });
    res.json(userFile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
