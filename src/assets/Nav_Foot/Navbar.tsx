import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "./SearchBar";
import { useAuth } from "../AuthProvider";

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
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

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
              <Link to="/diagnosisSclap">
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
              <Link to="/skincare/sub1">
                <li>클렌져</li>
              </Link>
              <Link to="/skincare/sub2">
                <li>토너</li>
              </Link>
              <Link to="/skincare/sub3">
                <li>세럼&에센스</li>
              </Link>
              <Link to="/skincare/sub2">
                <li>로션&크림</li>
              </Link>
              <Link to="/skincare/sub2">
                <li>선케어</li>
              </Link>
            </ul>
          </li>
          <li>
            <span>두피</span>
            <ul className="sub-menu">
              <Link to="/scalp/sub1">
                <li>샴푸</li>
              </Link>
              <Link to="/scalp/sub2">
                <li>트리트먼트</li>
              </Link>
              <Link to="/scalp/sub2">
                <li>토닉&세럼</li>
              </Link>
              <Link to="/scalp/sub2">
                <li>스케일링</li>
              </Link>
            </ul>
          </li>
        </ul>
        <ul className="login">
          <li>
            <img src="/search-icon.png" style={{ height: "20px", paddingTop: "2px", cursor: "pointer" }} onClick={handleSearchClick} />
          </li>
          {isLoggedIn ? (
            <li>
              <Link to="/mypage">마이페이지</Link> /{" "}
              <button onClick={handleLogout}>로그아웃</button>
            </li>
          ) : (
            <li>
              <Link to="/login">로그인 / 회원가입</Link>
            </li>
          )}
        </ul>
      </nav>
      {showSearch && <SearchBar />}</>
  );
};

export default Navbar;