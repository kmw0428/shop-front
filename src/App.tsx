import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./assets/Nav_Foot/Navbar";
import Footer from "./assets/Nav_Foot/Footer";
import ScrollToTop from "./assets/ScrollToTop";
import HomePage from "./assets/HomePage";
import Login from './assets/User/Login';
import Products from "./assets/Product/Products";
import ProductList from "./assets/Product/ProductList";
import DiagnosisSclap from './assets/Diagnosis/DiagonsisSclap';
import DiagnosisSkin from "./assets/Diagnosis/DiagnosisSkin";
import Result from './assets/Diagnosis/Result';
import ReviewPage from './assets/Product/ReviewPage';
import CartPage from '../CartPage';

const App: React.FC = () => {
  const location = useLocation();

  const noOverflowPaths = [
    "/login"
  ];

  useEffect(() => {
    if (noOverflowPaths.includes(location.pathname)) {
      document.body.classList.add("no-overflow");
    } else {
      document.body.classList.remove("no-overflow");
    }

    return () => {
      document.body.classList.remove("no-overflow");
    };
  }, [location.pathname, noOverflowPaths]);

  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <div className="maincontent">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/diagnosisSclap" element={<DiagnosisSclap />} />
          <Route path="/diagnosisSkin" element={<DiagnosisSkin />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/product" element={<Products />} />
          <Route path="/all/sub1" element={<div>All Subcategory 1</div>} />
          <Route path="/all/sub2" element={<div>All Subcategory 2</div>} />
          <Route path="/custom/sub1" element={<div>Custom Subcategory 1</div>} />
          <Route path="/custom/sub2" element={<div>Custom Subcategory 2</div>} />
          <Route path="/skincare/sub1" element={<div>Skincare Subcategory 1</div>} />
          <Route path="/skincare/sub2" element={<div>Skincare Subcategory 2</div>} />
          <Route path="/scalp/sub1" element={<Products />} />
          <Route path="/scalp/sub2" element={<div>Scalp Subcategory 2</div>} />
          <Route path='/result' element={<Result />} />
          <Route path='/reviews' element={<ReviewPage />} />
          <Route path='/cartpage' element={<CartPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
