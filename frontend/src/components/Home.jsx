import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Skeleton,
  CardActions,
  CardMedia,
  Tooltip,
  Button,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import BookCarousel from "./BookCarousel";
import { Typewriter } from "react-simple-typewriter";
import { keyframes } from "@mui/system";

const slideDn = keyframes`
  from {
    transform: translateY(0);
    opacity: 0;
  }
  to {
    transform: translateY(10px);
    opacity: 1;
  }
`;

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://gutendex.com/books/?sort=popular")
      .then((res) => {
        setBooks(res.data.results.slice(0, 8));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching top picks:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Typography
        variant="h4"
        align="center"
        sx={{
          mt: 4,
          mb: 2,
          fontWeight: "bold",
          color: "#4b2a6e",
          animation: `${slideDn} 1.5s ease-out forwards`,
        }}
      >
        Discover the World of Books
      </Typography>
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        <Typewriter
          words={[
            "Explore a curated collection of timeless books, ready to read anytime.",
          ]}
          loop={1}
          cursor
          cursorStyle="|"
          typeSpeed={50}
          deleteSpeed={20}
          delaySpeed={1000}
        />
      </Typography>
      <BookCarousel />
      <Typography
        variant="h5"
        sx={{
          fontWeight:"bold",
          mt: 3,
          ml: 2,
          color: "white",
          display: "flex",
          justifyContent: "center",
          transition: "transform 0.3s ease, color 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            color: "#30204d", 
          },
        }}
      >
        Top Picks
      </Typography>

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
        {loading ? (
          Array.from(new Array(8)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{ height: 230, width: 240, m: 2, background: "#f9f7fa" }}
              >
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
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {books.map((book) => (
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
                    backgroundImage: `url('/card2.jpg')`,
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #ddd",
                    boxShadow: 2,
                    height: 230,
                    m: 2,
                    width: 240,
                    position: "relative",
                    overflow: "hidden",
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
                  <Box sx={{ position: "relative", height: 150,mt:1 }}>
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
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            borderColor: "#fff",
                            color: "#fff",
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
                          cursor: "pointer",
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          component={Link}
          to="/catalogue"
          sx={{
            background: "#30204d",
            maxWidth: "300px",
            mb: 3,
            color: "white",
            transition: "transform 0.3s ease, color 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              color: "white",
            },
          }}
        >
          Browse Full Catalogue
        </Button>
      </Box>
    </div>
  );
};

export default Home;
