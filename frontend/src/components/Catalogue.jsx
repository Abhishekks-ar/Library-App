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
import Navbar from "./Navbar"; // adjust path as needed
import { useBookContext } from "./BookContext";

const categories = ["Science", "Fiction", "History", "Philosophy", "Children"];

const Catalogue = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Science"); // default to Science
  const { addBook } = useBookContext();
  
  const handleSelect = (book) => {
    addBook(book, selectedCategory); // 👈 pass selected category explicitly
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

        // 🔍 Filter books whose bookshelves match selectedCategory
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
      <Grid
        container
        spacing={2}
        padding={2}
        xs={12}
        sm={6}
        md={4}
        lg={3}
        sx={{ display: "flex", minHeight: "100vh", justifyContent: "center" }}
      >
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card sx={{ height: 230, width: 250, ml: 3.5 }}>
                  <Skeleton variant="rectangular" height={150} />
                  <CardContent>
                    <Skeleton width="80%" />
                    <Skeleton width="60%" />
                  </CardContent>
                  <CardActions>
                    <Skeleton variant="rectangular" width={80} height={30} />
                  </CardActions>
                </Card>
              </Grid>
            ))
          : books.map((book) => (
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
                    border: "1px solid #ddd",
                    boxShadow: 2,
                    height: 250,
                    m: 2,
                    width: 250,
                    position: "relative",
                    overflow: "hidden",
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
                          borderColor: "#fff",
                          borderRadius: "20px",
                          backdropFilter: "blur(5px)",
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
                      padding: 1, // reduce padding
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
                          cursor: "pointer", // Optional: to indicate hoverable
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
                        whiteSpace: "nowrap", // Ensures single line
                      }}
                    >
                      {book.authors.length > 0
                        ? book.authors.map((author) => author.name).join(", ")
                        : "Unknown Author"}
                    </Typography>

                    <Button
                      size="small"
                      variant="contained"
                      // fullWidth
                      onClick={() => handleSelect(book)}
                      sx={{
                        mt: 0.5,
                        fontSize: "0.75rem",
                        padding: "4px 8px",
                        alignSelf: "center",
                      }}
                    >
                      Select
                    </Button>
                  </CardContent>

                  {/* <CardActions
                    sx={{ padding: "8px", justifyContent: "space-between" }}
                  >
                    <Button onClick={() => addBook(book)}>Select</Button>
                  </CardActions> */}
                </Card>
              </Grid>
            ))}
      </Grid>
    </div>
  );
};

export default Catalogue;
