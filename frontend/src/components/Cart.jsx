import React, { useState } from "react";
import { useBookContext } from "./BookContext";
import {
  Button,
  List,
  ListItem,
  Paper,
  Typography,
  Link as MuiLink,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Link } from "react-router-dom";

const Cart = () => {
  const { selectedBooks, removeBook, clearSelection } = useBookContext();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleRemove = (id) => {
    removeBook(id);
    setSnackbar({
      open: true,
      message: "Book removed from cart",
      severity: "error",
    });
  };

  const handleCheckout = () => {
    selectedBooks.forEach((book) => {
      console.log("Checking out book:", book.title);
    });
    clearSelection();
    setSnackbar({
      open: true,
      message: "Checked out successfully!",
      severity: "success",
    });
  };

  return (
    <Box sx={{ minHeight: "70vh", pt: 3, px: { xs: 2, sm: 5, md: 8 } }}>
      <Typography variant="h5" gutterBottom>
        Your Selected Books
      </Typography>

      {selectedBooks.length === 0 ? (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body1" gutterBottom>
            Your cart is empty. Explore our{" "}
            <MuiLink component={Link} to="/catalogue" underline="hover">
              full catalogue
            </MuiLink>{" "}
            and start selecting books!
          </Typography>
        </Box>
      ) : (
        <>
          <List>
            {selectedBooks.map((book) => (
              <Paper
                key={book.id}
                elevation={3}
                sx={{ marginBottom: 2, padding: 2 }}
              >
                <ListItem
                  secondaryAction={
                    <Button
                      color="error"
                      onClick={() => handleRemove(book.id)}
                      startIcon={<RemoveCircleIcon />}
                    >
                      Remove
                    </Button>
                  }
                >
                  {book.title}
                </ListItem>
              </Paper>
            ))}
          </List>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              disabled={selectedBooks.length === 0}
              sx={{
                mt: 2,
                background: "#30204d",
                transition: "all 0.3s ease",
                transformOrigin: "center",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  backgroundColor: "#30204d",
                },
                "&:active": {
                  transform: "scale(0.97)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                },
              }}
            >
              Checkout ({selectedBooks.length})
            </Button>
          </Box>
        </>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cart;
