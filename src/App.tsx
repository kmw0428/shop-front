import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // 추가된 부분
import "./App.css";
import Navbar from "./assets/Nav_Foot/Navbar";
import Footer from "./assets/Nav_Foot/Footer";
import ScrollToTop from "./assets/ScrollToTop";
import HomePage from "./assets/HomePage";
import Login from "./assets/User/Login";
import ProductList from "./assets/Product/ProductList";
import DiagnosisScalp from "./assets/Diagnosis/DiagonsisScalp";
import DiagnosisSkin from "./assets/Diagnosis/DiagnosisSkin";
import SkinResult from "./assets/Diagnosis/SkinResult";
import ScalpResult from "./assets/Diagnosis/ScalpResult";
import CartPage from "./assets/User/CartPage";
import ProductPage from "./assets/Product/ProductPage";
import NewProduct from "./assets/Product/NewProduct";
import BestProduct from "./assets/Product/BestProduct";
import Wishlist from "./assets/User/Wishlist";
import Mypage from "./assets/User/Mypage";
import SearchResults from "./assets/Product/SearchResult";
import EditUser from "./assets/User/EditUser";
import Checkout from "./assets/User/Checkout";
import MyReview from "./assets/User/MyReview";
import { SuccessPage } from "./assets/User/SuccessPage";
import { FailPage } from "./assets/User/FailPage";
import ScrollToTopButton from "./assets/Components/ScrollToTopButton";
import EventPage from "./assets/Product/EventPage";

const queryClient = new QueryClient(); // 추가된 부분

const App: React.FC = () => {
  const location = useLocation();

  const noOverflowPaths = ["/login"];

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
    <QueryClientProvider client={queryClient}>
      {" "}
      {/* 추가된 부분 */}
      <div>
        <Navbar />
        <ScrollToTop />
        <div className="maincontent">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/diagnosisScalp" element={<DiagnosisScalp />} />
            <Route path="/diagnosisSkin" element={<DiagnosisSkin />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/product-list/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/newproduct" element={<NewProduct />} />
            <Route path="/bestproduct" element={<BestProduct />} />
            <Route path="/skinresult" element={<SkinResult />} />
            <Route path="/scalpresult" element={<ScalpResult />} />
            <Route path="/cartpage" element={<CartPage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mypage/eidtuser" element={<EditUser />} />
            <Route path="/mypage/myreview" element={<MyReview />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/fail" element={<FailPage />} />
            <Route path="/eventpage" element={<EventPage />} />
          </Routes>
        </div>
        <Footer />
        <ScrollToTopButton />
      </div>
    </QueryClientProvider>
  );
};

export default App;
