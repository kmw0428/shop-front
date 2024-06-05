import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./assets/Nav_Foot/Navbar";
import Footer from "./assets/Nav_Foot/Footer";
import ScrollToTop from "./assets/ScrollToTop";
import HomePage from "./assets/HomePage";
import Login from './assets/User/Login';
import ProductList from "./assets/Product/ProductList";
import DiagnosisSclap from './assets/Diagnosis/DiagonsisSclap';
import DiagnosisSkin from "./assets/Diagnosis/DiagnosisSkin";
import SkinResult from "./assets/Diagnosis/SkinResult";
import SclapResult from "./assets/Diagnosis/SclapResult";
import ReviewsList from "./assets/Product/ReviewsList";
import CartPage from "./assets/User/CartPage";
import ProductPage from "./assets/Product/ProductPage";
import Wishlist from "./assets/Product/Wishlist";
import Mypage from "./assets/User/Mypage";

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
          <Route path="/product-list/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path='/skinresult' element={<SkinResult />} />
          <Route path="/sclapresult" element={<SclapResult />} />
          <Route path='/reviews' element={<ReviewsList />} />
          <Route path='/cartpage' element={<CartPage />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/mypage' element={<Mypage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
