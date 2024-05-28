import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop.current) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={isVisible ? "visible" : "hidden"}>
      <ul className="main-menu">
        <div className="navbar__logo">
          <li>
            <Link to="/">
              <img src="/logo.png" alt="Logo" style={{ height: "40px" }} />
            </Link>
          </li>
        </div>
        <li>
          <span>진단</span>
          <ul className="sub-menu">
            <li>
              <Link to="/diagnosis">피부 진단</Link>
            </li>
            <li>
              <Link to="">두피 진단</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/products">상품보기</Link>
        </li>
        <li>
          <span>전체</span>
          <ul className="sub-menu">
            <li>
              <Link to="/all/sub1">서브 카테고리 1</Link>
            </li>
            <li>
              <Link to="/all/sub2">서브 카테고리 2</Link>
            </li>
          </ul>
        </li>
        <li>
          <span>맞춤</span>
          <ul className="sub-menu">
            <li>
              <Link to="/custom/sub1">서브 카테고리 1</Link>
            </li>
            <li>
              <Link to="/custom/sub2">서브 카테고리 2</Link>
            </li>
          </ul>
        </li>
        <li>
          <span>스킨케어</span>
          <ul className="sub-menu">
            <li>
              <Link to="/skincare/sub1">서브 카테고리 1</Link>
            </li>
            <li>
              <Link to="/skincare/sub2">서브 카테고리 2</Link>
            </li>
          </ul>
        </li>
        <li>
          <span>두피</span>
          <ul className="sub-menu">
            <li>
              <Link to="/scalp/sub1">서브 카테고리 1</Link>
            </li>
            <li>
              <Link to="/scalp/sub2">서브 카테고리 2</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
