const express = require("express");

const router = express.Router();
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//root route is files
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

module.exports = router;
