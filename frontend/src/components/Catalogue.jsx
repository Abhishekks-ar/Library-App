// Catalogue.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Skeleton,
  Box,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useBookContext } from "./BookContext";

const categories = ["Science", "Fiction", "History", "Philosophy", "Children"];

const Catalogue = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Science");
  const { addBook, selectedBooks } = useBookContext();

  const handleSelect = (book) => {
    addBook(book, selectedCategory);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://gutendex.com/books/?topic=${selectedCategory}`
        );
        const rawBooks = res.data.results;
        const filteredBooks = rawBooks.filter((book) =>
          book.bookshelves?.some((shelf) =>
            shelf.toLowerCase().includes(selectedCategory.toLowerCase())
          )
        );
        setBooks(filteredBooks);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [selectedCategory]);

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
        <FormControl fullWidth sx={{ maxWidth: "400px" }}>
          <InputLabel>Choose Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Choose Category"
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }}>
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{ height: 250, width: 250, m: 2, background: "#f9f7fa" }}
                >
                  <Skeleton variant="rectangular" height={140} />
                  <CardContent>
                    <Skeleton width="80%" />
                    <Skeleton width="60%" />

                    <CardActions
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={60}
                        height={15}
                        sx={{ mb: 2 }}
                      />
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : books.map((book) => {
              const isSelected = selectedBooks.some((b) => b.id === book.id);
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={book.id}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      background: "#4b2a6e",
                      border: "1px solid #ddd",
                      boxShadow: 2,
                      height: 250,
                      m: 2,
                      width: 250,
                      position: "relative",
                      overflow: "hidden",
                      backgroundColor: isSelected ? "#f0f0f0" : "#fff",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                      },
                      "&:hover .hover-button": {
                        opacity: 1,
                      },
                    }}
                  >
                    <Box sx={{ position: "relative", height: 150 }}>
                      <CardMedia
                        component="img"
                        image={book.formats["image/jpeg"]}
                        alt={book.title}
                        loading="lazy"
                        sx={{
                          height: "100%",
                          objectFit: "contain",
                          objectPosition: "center",
                          width: "100%",
                        }}
                      />
                      <Box
                        className="hover-button"
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          zIndex: 2,
                        }}
                      >
                        <Button
                          variant="outlined"
                          component={Link}
                          to={`/book/${book.id}`}
                          sx={{
                            color: "#fff",
                            borderWidth: "2px",
                            borderColor: "#fff",
                            borderRadius: "20px",
                            backdropFilter: "blur(5px)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                              backgroundColor: "rgba(255, 255, 255, 0.1)", // optional subtle hover
                              borderColor: "#fff",
                              color: "#fff", // keep text color white on hover
                            },
                            "&:active": {
                              transform: "scale(0.97)",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            },
                          }}
                        >
                          Details
                        </Button>
                      </Box>
                    </Box>

                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: 1,
                      }}
                    >
                      <Tooltip title={book.title} arrow>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{
                            fontSize: "1rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {book.title}
                        </Typography>
                      </Tooltip>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {book.authors.length > 0
                          ? book.authors.map((author) => author.name).join(", ")
                          : "Unknown Author"}
                      </Typography>

                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleSelect(book)}
                        disabled={isSelected}
                        sx={{
                          mt: 0.5,
                          fontSize: "0.75rem",
                          padding: "4px 8px",
                          alignSelf: "center",
                          transition: "all 0.3s ease",
                          transformOrigin: "center",
                          // Animate only when not disabled
                          ...(isSelected
                            ? {}
                            : {
                                "&:hover": {
                                  transform: "scale(1.05)",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                                  backgroundColor: "primary.dark", // or your preferred hover color
                                },
                                "&:active": {
                                  transform: "scale(0.97)",
                                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                },
                              }),
                        }}
                      >
                        {isSelected ? "Selected" : "Select"}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
      </Grid>
    </div>
  );
};

export default Catalogue;
