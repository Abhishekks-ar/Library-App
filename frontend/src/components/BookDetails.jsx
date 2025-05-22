import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";

const BookDetails = () => {
  const { id } = useParams();
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

  if (loading) return <CircularProgress />;
  if (!book) return <Typography>No book found</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          image={book.formats["image/jpeg"]}
          alt={book.title}
          sx={{ height: 300, objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Author(s):{" "}
            {book.authors.length > 0
              ? book.authors.map((a) => a.name).join(", ")
              : "Unknown"}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Subjects: {book.subjects?.join(", ") || "N/A"}
          </Typography>
          <Typography variant="body2">
            Bookshelves: {book.bookshelves?.join(", ") || "N/A"}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BookDetails;
