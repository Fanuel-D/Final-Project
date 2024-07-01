import "../styles/HomePage.css";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/joy/Button";
import { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HomeAppBar from "./HomeAppBar";
import axios from "axios";
import ParsedPDFHandler from "./ParsedPDFHandler";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Homepage({ user, logout }) {
  const [file, setFile] = useState(null);
  const [pdfText, setPdfText] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post("http://localhost:3000/parse-pdf/upload-pdf", formData, {
          headers: {
            "Content-Type": `multipart/form-data;`,
          },
        })
        .then((respone) => setPdfText(respone))
        .catch((error) => console.log("Error: ", error));
    }
  }, [file]);

  // const createInteractableText = (text) => {
  //   return text.split(/\s+/).map((word, index) => (
  //     <span
  //       key={index}
  //       className="word"
  //       onClick={() => alert(`You clicked on the word: ${word}`)}
  //     >
  //       {word}&nbsp;
  //     </span>
  //   ));
  // };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <HomeAppBar user={user} logout={logout} />
      </Box>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box
          margin={"10px"}
          width={"50%"}
          height={"auto"}
          my={4}
          display="flex"
          alignItems="center"
          gap={4}
          p={2}
          sx={{ border: "2px solid grey" }}
        >
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput onChange={handleFileChange} type="file" />
          </Button>
        </Box>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box
          margin={"10px"}
          width={"50%"}
          height={"80vh"}
          my={4}
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          gap={4}
          p={2}
          sx={{
            border: "2px solid grey",
            backgroundColor: "white",
            overflow: "auto",
            padding: "30px",
            boxSizing: "border-box",
          }}
        >
          {pdfText ? <ParsedPDFHandler data={pdfText.data} /> : ""}
        </Box>
      </div>
    </>
  );
}

export default Homepage;
