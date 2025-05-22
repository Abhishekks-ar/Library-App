import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const categories = ["Science", "Fiction", "History", "Fantasy", "Biography"];

const Navbar = ({ selectedCategory, onCategoryChange }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // detect mobile

  const handleChange = (event) => {
    onCategoryChange(event.target.value);
    navigate("/catalogue");
  };

  return (
  <AppBar position="static" sx={{ overflowX: "hidden" }}>
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        px: 1,
      }}
    >
      {/* Left-aligned logo/title */}
      <Typography
        variant="h6"
        component={Link}
        to="/home"
        color="inherit"
        sx={{
          textDecoration: "none",
          flexShrink: 0,
          fontSize: isMobile ? "1rem" : "1.25rem",
        }}
      >
        Library App
      </Typography>

      {/* Right-aligned buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          ml: "auto",
          mt: isMobile ? 1 : 0,
        }}
      >
        <Typography
          variant="h6"
          component={Link}
          to="/home"
          color="inherit"
          sx={{
            textDecoration: "none",
            fontSize: isMobile ? "1rem" : "1.25rem",
          }}
        >
          Home
        </Typography>
        <Typography
          variant="h6"
          component={Link}
          to="/catalogue"
          color="inherit"
          sx={{
            textDecoration: "none",
            fontSize: isMobile ? "1rem" : "1.25rem",
          }}
        >
          Catalogue
        </Typography>
        <Typography
          variant="h6"
          component={Link}
          to="/cart"
          color="inherit"
          sx={{
            textDecoration: "none",
            fontSize: isMobile ? "1rem" : "1.25rem",
          }}
        >
          Cart
        </Typography>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          color="inherit"
          sx={{
            textDecoration: "none",
            fontSize: isMobile ? "1rem" : "1.25rem",
          }}
        >
          Logout
        </Typography>
      </Box>
    </Toolbar>
  </AppBar>
);

};

export default Navbar;
