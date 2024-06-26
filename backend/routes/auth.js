const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
// Route for user registration
router.post("/users/signup", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username: username }, { email: email }] },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        email: email,
      },
    });
    const token = jwt.sign({ newUser }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/users/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (isCorrectPassword) {
      const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
      res.send(token);
    } else {
      res.status(401).send({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/users/me", async (req, res) => {
  const token = req.headers.authorization;

  const user = jwt.verify(token, process.env.JWT_SECRET);
  res.send(user);
});

module.exports = router;
