import "../styles/HomePage.css";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/joy/Button";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HomeAppBar from "./HomeAppBar";

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
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    PDFViewer(file);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <HomeAppBar user={user} logout={logout} />
      </Box>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box
          margin={"10px"}
          width={"50%"}
          height={"20vh"}
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
          height={"20vh"}
          my={4}
          display="flex"
          alignItems="center"
          gap={4}
          p={2}
          sx={{ border: "2px solid grey" }}
        ></Box>
      </div>
    </>
  );
}

export default Homepage;
