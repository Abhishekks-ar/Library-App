import React from "react";
import { Box, Typography, Link, Divider } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#30204d",
        color: "#ffffff",
        textAlign: "center",
        py: 3,
        px: 2,
        mt: "auto",
      }}
    >
      <Divider sx={{ mb: 2, borderColor: "#555" }} />

      <Typography variant="body2" sx={{ mb: 1 }}>
        © {new Date().getFullYear()} My Library App. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
