import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Diagnose from "./assets/Navpages/Diagnose";
import Products from "./assets/Navpages/Products";
import Test from "./Test";
import ProductList from "./assets/Product/ProductList";
import "./App.css";
import Footer from "./Footer";

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/diagnose" element={<Diagnose />} />
        <Route path="/products" element={<Products />} />
        <Route path="/test" element={<Test />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/all/sub1" element={<div>All Subcategory 1</div>} />
        <Route path="/all/sub2" element={<div>All Subcategory 2</div>} />
        <Route path="/custom/sub1" element={<div>Custom Subcategory 1</div>} />
        <Route path="/custom/sub2" element={<div>Custom Subcategory 2</div>} />
        <Route
          path="/skincare/sub1"
          element={<div>Skincare Subcategory 1</div>}
        />
        <Route
          path="/skincare/sub2"
          element={<div>Skincare Subcategory 2</div>}
        />
        <Route path="/scalp/sub1" element={<div>Scalp Subcategory 1</div>} />
        <Route path="/scalp/sub2" element={<div>Scalp Subcategory 2</div>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
