import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Products from "./assets/Navpages/Products";
import Test from "./Test";
import ProductList from "./assets/Product/ProductList";
import "./App.css";
import Footer from "./Footer";
import Diagnosis from './assets/Diagnosis/Diagonsis'
import Result from './assets/Diagnosis/Result'

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
        <Route path='/diagnosis' element={<Diagnosis />} />
        <Route path='/result' element={<Result />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
