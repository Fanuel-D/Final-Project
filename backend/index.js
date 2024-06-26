const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/auth.js");
const parsePDF = require("./routes/parse-pdf.js");
var cors = require("cors");
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use("/auth", userRoutes);
app.use("/parse-pdf", parsePDF);
// app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
