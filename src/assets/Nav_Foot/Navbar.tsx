import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const lastScrollTop = useRef(0);

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className={isVisible ? "visible" : "hidden"}>
        <div className="navbar__logo">
          <li>
            <Link to="/">
              <img src="/logo.png" alt="Logo" style={{ height: "40px" }} />
            </Link>
          </li>
        </div>
        <ul className="main-menu">
          <li>
            <span>진단</span>
            <ul className="sub-menu">
              <li>
                <Link to="/diagnosisSkin">피부 진단</Link>
              </li>
              <li>
                <Link to="/diagnosisSclap">두피 진단</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/product-list">전체</Link>
          </li>
          <li>
            <Link to="/custom">맞춤</Link>
          </li>
          <li>
            <span>스킨</span>
            <ul className="sub-menu">
              <li>
                <Link to="/skincare/sub1">클렌져</Link>
              </li>
              <li>
                <Link to="/skincare/sub2">토너</Link>
              </li>
              <li>
                <Link to="/skincare/sub3">세럼&에센스</Link>
              </li>
              <li>
                <Link to="/skincare/sub2">로션&크림</Link>
              </li>
              <li>
                <Link to="/skincare/sub2">선케어</Link>
              </li>
            </ul>
          </li>
          <li>
            <span>두피</span>
            <ul className="sub-menu">
              <li>
                <Link to="/scalp/sub1">샴푸</Link>
              </li>
              <li>
                <Link to="/scalp/sub2">트리트먼트</Link>
              </li>
              <li>
                <Link to="/scalp/sub2">토닉&세럼</Link>
              </li>
              <li>
                <Link to="/scalp/sub2">스케일링</Link>
              </li>
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
