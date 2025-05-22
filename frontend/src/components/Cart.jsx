import { useBookContext } from "./BookContext";
import { Button, List, ListItem, Paper, Typography } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const Cart = () => {
  const { selectedBooks, removeBook, clearSelection } = useBookContext();

  return (
    <div>
  <Typography variant="h5" gutterBottom>
    Your Selected Books
  </Typography>
  <List>
    {selectedBooks.map((book) => (
      <Paper
        key={book.id}
        elevation={3}
        sx={{ marginBottom: 2, padding: 2 }}
      >
        <ListItem
          secondaryAction={
            <Button color="error" onClick={() => removeBook(book.id)}>
              Remove<RemoveCircleIcon />
            </Button>
          }
        >
          {book.title}
        </ListItem>
      </Paper>
    ))}
  </List>
  <Button
    variant="contained"
    color="primary"
    onClick={clearSelection}
    disabled={selectedBooks.length === 0}
  >
    Checkout ({selectedBooks.length})
  </Button>
</div>
  );
};

export default Cart;
