import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Main = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const enhancedChildren = React.isValidElement(children)
    ? React.cloneElement(children, { selectedCategory })
    : children;

  return (
    <div>
      <Navbar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      {enhancedChildren}
      <Footer />
    </div>
  );
};

export default Main;
