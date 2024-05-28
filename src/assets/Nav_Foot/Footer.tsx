import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 50) { // 페이지 끝에서 50px 이내
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

  return (
    <footer id="Footer" className={isVisible ? "visible" : "hidden"}>
      <div className="oneConts">
        <div className="conts">
          <ul className="list-area">
            <li className="footer-content1">
              <span className="logo">
                <Link to="/">
                  <img src="/logo.png" alt="Logo" />
                </Link>
              </span>
            </li>
            <li className="footer-content">
              <div>
                <h2>셀레스트 주식회사</h2>
                <span>대표이사 : | 사업자등록번호 : </span>
                <span>주소 : (0000) 대전광역시 뭐시기 (흠)</span>
                <span>호스팅사업자 : </span>
                <span>통신판매업신고번호 : </span>
                <span>이메일 : example@example.com</span>
                <span>사업자 정보확인 &gt;</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
