import { Routes, Route } from "react-router-dom";
import Catalogue from "./components/Catalogue";
import Login from "./components/Login";
import BookDetails from "./components/BookDetails";
import Main from "./components/Main";
import { BookProvider } from "./components/BookContext";
import Home from "./components/Home";
import Cart from "./components/Cart";

function App() {
  return (
    <BookProvider>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right,rgb(201, 196, 196),rgb(144, 149, 149))", // Customize this gradient
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/home"
            element={
              <Main>
                <Home />
              </Main>
            }
          />

          <Route
            path="/catalogue"
            element={
              <Main>
                <Catalogue />
              </Main>
            }
          />

          <Route
            path="/book/:id"
            element={
              <Main>
                <BookDetails />
              </Main>
            }
          />

          <Route
            path="/cart"
            element={
              <Main>
                <Cart />
              </Main>
            }
          />
        </Routes>
      </div>
    </BookProvider>
  );
}

export default App;
