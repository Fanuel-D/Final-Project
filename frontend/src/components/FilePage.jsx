import { react } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import HomeAppBar from "./HomeAppBar";

function FilePage({ user }) {
  const { fileID } = useParams();
  return (
    <>
      <HomeAppBar user={user} />
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
        ></Box>
      </div>
    </>
  );
}

export default FilePage;
