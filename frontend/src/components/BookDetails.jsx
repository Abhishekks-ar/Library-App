import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Link,
  Button,
  Box,
  Skeleton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuBookIcon from '@mui/icons-material/MenuBook';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://gutendex.com/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch book:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
          <Skeleton variant="rectangular" height={400} />
          <CardContent>
            <Skeleton variant="text" height={40} />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="90%" />
          </CardContent>
        </Card>
      </Container>
    );
  }

  if (!book) return <Typography>No book found</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 2 }}>
      <Card sx={{ boxShadow: 4, backgroundImage: `url('/card2.jpg')` }}>
        <Box
          sx={{
            backgroundImage: `url('/card2.jpg')`,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#f4f4f4",
            p: 2,
          }}
        >
          <CardMedia
            component="img"
            image={book.formats["image/jpeg"]}
            alt={book.title}
            loading="lazy"
            sx={{
              maxHeight: 300,
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        <CardContent>
          <Typography variant="h5" gutterBottom>
            Title : {book.title}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Author(s):{" "}
            {book.authors.length > 0
              ? book.authors.map((a) => a.name).join(", ")
              : "Unknown"}
          </Typography>

          {book.description && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              <strong>Summary:</strong>{" "}
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </Typography>
          )}

          <Typography variant="body2" sx={{ mt: 2 }}>
            <strong>Subjects:</strong> {book.subjects?.join(", ") || "N/A"}
          </Typography>

          {book.formats["text/html"] && (
            <Typography variant="body2" sx={{ mt: 2, }}>
              <Link
                href={book.formats["text/html"]}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                <MenuBookIcon sx={{pb:0.5}}/> Read Online
              </Link>
            </Typography>
          )}

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button
              className="animated-button"
              variant="outlined"
              onClick={() => navigate(-1)}
              startIcon={<ArrowBackIcon />}
              sx={{
                color: "#30204d",
                borderWidth: "2px",
                borderColor: "#30204d",
                borderRadius: "20px",
                // backdropFilter: "blur(5px)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  borderColor: "#30204d",
                  color: "#30204d", 
                },
                "&:active": {
                  transform: "scale(0.97)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                },
              }}
            >
              Back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BookDetails;
