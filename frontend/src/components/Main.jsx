import React, { useState } from 'react';
import Navbar from './Navbar';

const Main = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Inject selectedCategory into the child component if it's a valid React element
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
    </div>
  );
};

export default Main;
