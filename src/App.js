import React from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import FilteredProducts from "./Components/FiltredProducts/FilteredProducts";
import SingleProduct from "./Components/FiltredProducts/SingleProduct";
import Login from "./Components/Login/Login";
import Registration from "./Components/Registration/registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/filteredProducts/:type" element={<FilteredProducts />} />
            <Route path="/filteredProducts/:type/:id" element={<SingleProduct />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
