import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "./SearchBar";
import { useAuth } from "../Auth/AuthProvider";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Swal from "sweetalert2";

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop === 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  const handleWishClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      Swal.fire({
        title: "로그인이 필요합니다.",
        text: "로그인 후 이용해주세요.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "로그인 하러 가기",
        cancelButtonText: "취소",
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      navigate("/wishlist");
    }
  };

  const handlecartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      Swal.fire({
        title: "로그인이 필요합니다.",
        text: "로그인 후 이용해주세요.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "로그인 하러 가기",
        cancelButtonText: "취소",
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      navigate("/cartpage");
    }
  };

  return (
    <>
      <nav className={isVisible ? "visible" : "hidden"}>
        <div className="navbar__logo">
          <Link to="/">
            <li>
              <img src="/logo.png" alt="Logo" style={{ height: "40px" }} />
            </li>
          </Link>
        </div>
        <ul className="main-menu">
          <li>
            <span>진단</span>
            <ul className="sub-menu">
              <Link to="/diagnosisSkin">
                <li>피부 진단</li>
              </Link>
              <Link to="/diagnosisScalp">
                <li>두피 진단</li>
              </Link>
            </ul>
          </li>
          <Link to="/product-list">
            <li>전체</li>
          </Link>
          <Link to="/custom">
            <li>맞춤</li>
          </Link>
          <li>
            <span>스킨</span>
            <ul className="sub-menu">
              <Link to="/product-list/cleanser">
                <li>클렌져</li>
              </Link>
              <Link to="/product-list/toner">
                <li>토너</li>
              </Link>
              <Link to="/product-list/serumessence">
                <li>세럼&에센스</li>
              </Link>
              <Link to="/product-list/lotioncream">
                <li>로션&크림</li>
              </Link>
              <Link to="/product-list/suncare">
                <li>선케어</li>
              </Link>
            </ul>
          </li>
          <li>
            <span>두피</span>
            <ul className="sub-menu">
              <Link to="/product-list/shampoo">
                <li>샴푸</li>
              </Link>
              <Link to="/product-list/treat">
                <li>트리트먼트</li>
              </Link>
              <Link to="/product-list/tonic">
                <li>토닉&세럼</li>
              </Link>
            </ul>
          </li>
        </ul>
        <ul className="login">
          <li className="gotocart">
            <a href="#" className="icon" onClick={handlecartClick}>
              <AddShoppingCartIcon className="custom-icon" />
            </a>
          </li>
          <li className="gotowishlist">
            <a href="#" className="icon" style={{ color: "rgb(207, 92, 92)" }} onClick={handleWishClick}>
              <FavoriteIcon className="custom-icon" />
            </a>
          </li>
          <li>
            <img
              src="/search-icon.png"
              style={{ height: "20px", paddingTop: "2px", cursor: "pointer" }}
              onClick={handleSearchClick}
            />
          </li>
          {isLoggedIn ? (
            <li>
              <Link to="/mypage">마이페이지</Link> /{" "}
              <Link to="/" onClick={handleLogout}>
                로그아웃
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">로그인 / 회원가입</Link>
            </li>
          )}
        </ul>
      </nav>
      {showSearch && <SearchBar />}
    </>
  );
};

export default Navbar;
