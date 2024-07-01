const {
  ServicePrincipalCredentials,
  PDFServices,
  MimeType,
  ExtractPDFParams,
  ExtractRenditionsElementType,
  ExtractElementType,
  ExtractPDFJob,
  ExtractPDFResult,
} = require("@adobe/pdfservices-node-sdk");

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const app = express();
const upload = multer({ dest: "uploads/" });
const router = express.Router();
const AdmZip = require("adm-zip");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//root route is parse-pdf
router.post("/upload-pdf", upload.single("file"), async (req, res) => {
  const pdfPath = `${req.file.path}`;
  const user = JSON.parse(req.body.user);
  console.log(user);
  (async () => {
    let readStream;
    try {
      // Initial setup, create credentials instance
      const credentials = new ServicePrincipalCredentials({
        clientId: process.env.PDF_SERVICES_CLIENT_ID,
        clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET,
      });

      // Creates a PDF Services instance
      const pdfServices = new PDFServices({ credentials });

      // Creates an asset(s) from source file(s) and upload
      readStream = fs.createReadStream(pdfPath);
      const inputAsset = await pdfServices.upload({
        readStream,
        mimeType: MimeType.PDF,
      });

      // Create parameters for the job
      const params = new ExtractPDFParams({
        elementsToExtract: [ExtractElementType.TEXT, ExtractElementType.TABLES],
        elementsToExtractRenditions: [
          ExtractRenditionsElementType.FIGURES,
          ExtractRenditionsElementType.TABLES,
        ],
      });
      // Creates a new job instance
      const job = new ExtractPDFJob({ inputAsset, params });

      // Submit the job and get the job result
      const pollingURL = await pdfServices.submit({ job });
      const pdfServicesResponse = await pdfServices.getJobResult({
        pollingURL,
        resultType: ExtractPDFResult,
      });

      // Get content from the resulting asset(s)
      const resultAsset = pdfServicesResponse.result.resource;
      const streamAsset = await pdfServices.getContent({ asset: resultAsset });

      // Creates a write stream and copy stream asset's content to it
      const outputFilePath = "./ExtractTextInfoFromPDF.zip";
      console.log(`Saving asset at ${outputFilePath}`);

      const writeStream = fs.createWriteStream(outputFilePath);
      streamAsset.readStream.pipe(writeStream);

      let zip = new AdmZip(outputFilePath);
      const zipEntries = zip.getEntries();
      // Filter and extract only the 'figures' folder
      zipEntries.forEach((entry) => {
        if (entry.entryName.startsWith("figures/")) {
          // Extract this entry to current directory
          zip.extractEntryTo(entry.entryName, "./public/figures", false, true);
        }
      });
      let jsondata = zip.readAsText("structuredData.json");
      let filedata = JSON.parse(jsondata);

      const newFileCard = prisma.file.create({
        data: {
          fileName: "hello",
          fileDetails: filedata,
          username: user.username,
        },
      });
      res.json(newFileCard);
    } catch (err) {
      console.log("Exception encountered while executing operation", err);
    } finally {
      readStream?.destroy();
    }
  })();
});

module.exports = router;
