const express = require("express");
const multer = require("multer");
const fs = require("fs");
const app = express();
const upload = multer({ dest: "uploads/" });
const router = express.Router();
//root route is parse-pdf
router.post("/upload-pdf", upload.single("file"), async (req, res) => {
  const pdfPath = `${req.file.path}`;
  const dataBuffer = fs.readFileSync(pdfPath);
  const uint8Array = new Uint8Array(dataBuffer);
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const pdfDocument = await pdfjsLib.getDocument({ data: uint8Array }).promise;

  let pdfText = "";
  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const textContent = await page.getTextContent();
    const textItems = textContent.items.map((item) => item.str);
    pdfText += textItems.join(" ") + " ";
  }
  res.send(pdfText);
});

module.exports = router;
