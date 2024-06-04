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
import SkinResult from "./assets/Diagnosis/SkinResult";
import SclapResult from "./assets/Diagnosis/SclapResult";
import ReviewPage from './assets/Product/ReviewPage';
<<<<<<< HEAD
import CartPage from '../CartPage';
import ProductPage from "./assets/Product/ProductPage";

=======
import CartPage from './assets/User/CartPage';
import Wishlist from "./assets/Product/Wishlist";
>>>>>>> b73200251d4e1e640069cf3974ca74dbf442905b
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
          <Route path="/all/sub1" element={<div>All Subcategory 1</div>} />
          <Route path="/all/sub2" element={<div>All Subcategory 2</div>} />
          <Route path="/custom/sub1" element={<div>Custom Subcategory 1</div>} />
          <Route path="/custom/sub2" element={<div>Custom Subcategory 2</div>} />
          <Route path="/skincare/sub1" element={<div>Skincare Subcategory 1</div>} />
          <Route path="/skincare/sub2" element={<div>Skincare Subcategory 2</div>} />
          <Route path="/scalp/sub1" element={<Products />} />
          <Route path="/scalp/sub2" element={<div>Scalp Subcategory 2</div>} />
<<<<<<< HEAD
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path='/result' element={<Result />} />
=======
          <Route path='/skinresult' element={<SkinResult />} />
          <Route path="/sclapresult" element={<SclapResult />} />
>>>>>>> b73200251d4e1e640069cf3974ca74dbf442905b
          <Route path='/reviews' element={<ReviewPage />} />
          <Route path='/cartpage' element={<CartPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
