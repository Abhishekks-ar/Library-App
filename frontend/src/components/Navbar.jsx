import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
  Collapse,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const navItems = [
  { label: "Home", to: "/home", icon: <HomeIcon /> },
  { label: "Catalogue", to: "/catalogue", icon: <LibraryBooksIcon /> },
  { label: "Cart", to: "/cart", icon: <ShoppingCartIcon /> },
  { label: "Logout", to: "/", icon: <PowerSettingsNewIcon /> },
];

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#30204d" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/home"
            color="inherit"
            sx={{
              textDecoration: "none",
              fontWeight: "bold",
              letterSpacing: 1,
              fontSize: "1.25rem",
              "&:hover": { color: "#bb86fc" },
            }}
          >
            Library App
          </Typography>

          {isMobile ? (
            <IconButton color="inherit" onClick={handleToggle}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", gap: 3 }}>
              {navItems.map(({ icon, label, to }) => {
                const isActive = location.pathname === to;
                return (
                  <Box
                    key={label}
                    component={Link}
                    to={to}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      textDecoration: "none",
                      color: isActive ? "#bb86fc" : "white",
                      fontWeight: isActive ? "bold" : "normal",
                      borderBottom: isActive
                        ? "2px solid #bb86fc"
                        : "2px solid transparent",
                      "&:hover": {
                        color: "#bb86fc",
                        borderBottom: "2px solid #bb86fc",
                      },
                    }}
                  >
                    {icon}
                    {label}
                  </Box>
                );
              })}
            </Box>
          )}
        </Toolbar>

        {/* for mobile */}
        {isMobile && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ backgroundColor: "#30204d", px: 2 }}>
              {navItems.map(({ icon, label, to }) => {
                const isActive = location.pathname === to;
                return (
                  <Box
                    key={label}
                    component={Link}
                    to={to}
                    onClick={() => setOpen(false)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      py: 1.5,
                      textDecoration: "none",
                      color: isActive ? "#bb86fc" : "white",
                      fontWeight: isActive ? "bold" : "normal",
                      borderBottom: "1px solid rgba(255,255,255,0.2)",
                      "&:hover": {
                        color: "#bb86fc",
                      },
                    }}
                  >
                    {icon}
                    {label}
                  </Box>
                );
              })}
            </Box>
          </Collapse>
        )}
      </AppBar>
    </>
  );
};

export default Navbar;
