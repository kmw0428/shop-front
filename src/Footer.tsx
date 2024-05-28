import React from "react";
import { Link } from "react-router-dom";
import logo from "./img/logo.png";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer id="Footer" className="m2105">
      <div className="oneConts">
        <div className="conts">
          <ul className="list-area">
            <li className="footer-content">
              <p className="logo">
                <Link to="/">
                  <img src={logo} alt="Logo" />
                </Link>
              </p>
            </li>
            <li className="footer-content">
              <div>
                <h2>셀레스트 주식회사</h2>
                <p>대표이사 : | 사업자등록번호 : </p>
                <p>
                  주소 : (0000) 대전광역시 뭐시기 <br />
                  (흠)
                </p>
                <p>호스팅사업자 : </p>
                <p>통신판매업신고번호 : </p>
                <p>이메일 : example@example.com</p>
                <p>사업자 정보확인 &gt;</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
