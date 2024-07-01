const express = require("express");

const router = express.Router();
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//root route is files
router.get("/:username", async (req, res) => {});

module.exports = router;
