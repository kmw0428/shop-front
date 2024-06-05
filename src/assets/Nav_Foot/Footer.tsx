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
                <h2 className="company-name">셀레스트 주식회사</h2>
                <span>대표이사 : 김무원 | 사업자등록번호 : 123-456-7890 | </span>
                <span>주소 : (34838) 대전광역시 중구 중앙로 121번길 20 방산빌딩 (5층) | </span>
                <span>TEL : 042-123-4567 | </span>
                <span>FAX : 02-1234-4567</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
