const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const userRoutes = require("./routes/auth.js");
var cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/login", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
