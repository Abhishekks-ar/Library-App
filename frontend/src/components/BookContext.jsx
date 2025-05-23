import React, { createContext, useContext, useState } from "react";

const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);
const normalizeCategory = (rawShelf = "") => {
  const lc = rawShelf.toLowerCase();
  if (lc.includes("science")) return "Science";
  if (lc.includes("fiction")) return "Fiction";
  if (lc.includes("history")) return "History";
  if (lc.includes("philosophy")) return "Philosophy";
  if (lc.includes("children")) return "Children";
  return "Uncategorized";
};

export const BookProvider = ({ children }) => {
  const [selectedBooks, setSelectedBooks] = useState([]);

  const addBook = (book, selectedCategory) => {
    const category = selectedCategory; //
    console.log("Book category (from dropdown):", category);

    // Check if already selected
    if (selectedBooks.some((b) => b.id === book.id)) {
      alert("This book is already selected.");
      return;
    }

    // Check total limit
    if (selectedBooks.length >= 5) {
      alert("You can only select up to 5 books in total.");
      return;
    }

    // Check per-category limit
    const booksInCategory = selectedBooks.filter(
      (b) => b.selectedCategory === category
    );
    if (booksInCategory.length >= 3) {
      alert(
        `You can only select up to 3 books from the '${category}' category.`
      );
      return;
    }

    //  Add book, and tag it with selectedCategory
    const bookWithCategory = { ...book, selectedCategory: category };
    setSelectedBooks((prevBooks) => [...prevBooks, bookWithCategory]);
  };

  const removeBook = (id) => {
    setSelectedBooks(selectedBooks.filter((book) => book.id !== id));
  };

  const clearSelection = () => setSelectedBooks([]);

  return (
    <BookContext.Provider
      value={{
        selectedBooks,
        addBook,
        removeBook,
        clearSelection,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
