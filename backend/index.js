const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/auth.js");
var cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/auth", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
