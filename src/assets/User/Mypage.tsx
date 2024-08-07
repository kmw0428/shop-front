import React, { useEffect, useState } from 'react';
import './Mypage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface UserData {
  id?: string;
  nickname: string;
  skinType: string;
  scalpType: string;
}

interface Order {
  id: string;
  status: string;
}

const Mypage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [paidOrderCount, setPaidOrderCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const navigate = useNavigate();

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId"); // 로컬 스토리지에서 사용자 ID 가져오기
      try {
        const response = await axios.get(`https://shoppingback-ltd0.onrender.com/api/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    const fetchOrderCount = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(`https://shoppingback-ltd0.onrender.com/orders/user/${userId}`);
        const orders: Order[] = response.data;
        const pendingOrders = orders.filter(order => order.status === 'PENDING').length;
        const paidOrders = orders.filter(order => order.status !== 'PENDING').length;
        setPendingOrderCount(pendingOrders);
        setPaidOrderCount(paidOrders);
      } catch (error) {
        console.error("Failed to fetch order count:", error);
      }
    };

    const fetchReviewCount = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(`https://shoppingback-ltd0.onrender.com/reviews/user/${userId}`);
        setReviewCount(response.data.length); // 리뷰 개수를 상태에 저장
      } catch (error) {
        console.error("Failed to fetch review count:", error);
      }
    };

    const fetchWishCount = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(`https://shoppingback-ltd0.onrender.com/wish/user/${userId}`);
        setWishCount(response.data.length);
      } catch (error) {
        console.error("Failed to fetch wish count:", error);
      }
    }

    fetchUserData();
    fetchOrderCount();
    fetchReviewCount();
    fetchWishCount();
  }, []);

  const skin = (userData?.skinType)?.split(",").map(part => part.trim());
  const skinPart1Score = skin ? skin[0] : '';
  const skinPart2Score = skin ? skin[1] : '';
  const skinPart3Score = skin ? skin[2] : '';
  const skinPart4Score = skin ? skin[3] : '';
  const skinResult = skin?.slice(4).map(part => part.trim()).filter(Boolean).join(", ") || '';
  const skRe = skin?.slice(4) || "";

  const scalp = (userData?.scalpType)?.split(",").map(part => part.trim());
  const scalpPart1Score = scalp ? scalp[0] : '';
  const scalpPart2Score = scalp ? scalp[1] : '';
  const scalpPart3Score = scalp ? scalp[2] : '';
  const scalpPart4Score = scalp ? scalp[3] : '';
  const scalpResult = scalp?.slice(4).map(part => part.trim()).filter(Boolean).join(", ") || '';
  const scRe = scalp?.slice(4) || "";

  const getScalpResult = (code: string) => {
    switch (code) {
      case 'DASH':
      case 'DASI':
        return '건성, 탈모, 민감성';
      case 'DARH':
      case 'DARI':
        return '건성, 탈모';
      case 'DNSH':
      case 'DNSI':
        return '건성, 민감성';
      case 'DNRH':
      case 'DNRI':
        return '건성';
      case 'OASH':
      case 'OASI':
        return '지성, 탈모, 민감성';
      case 'OARH':
      case 'OARI':
        return '지성, 탈모';
      case 'ONSH':
      case 'ONSI':
        return '지성, 민감성';
      case 'ONRH':
      case 'ONRI':
        return '지성';
      default:
        return '';
    }
  };

  const scalpResultString = Array.isArray(scRe) ? getScalpResult(scRe.join("")) : '';

  const getSkinResult = (code: string) => {
    switch (code) {
      case 'DSPW':
      case 'DSPT':
        return '건성, 민감성';
      case 'DSNW':
      case 'DSNT':
        return '건성, 주름성';
      case 'DRPW':
      case 'DRNW':
        return '건성, 주름성';
      case 'DRPT':
      case 'DRNT':
        return '건성';
      case 'OSPW':
        return '지성';
      case 'OSPT':
      case 'OSNW':
      case 'OSNT':
        return '지성, 민감성';
      case 'ORPW':
      case 'ORNW':
        return '지성, 주름성';
      case 'ORPT':
      case 'ORNT':
        return '지성';
      default:
        return '';
    }
  };

  const skinResultString = Array.isArray(skRe) ? getSkinResult(skRe.join("")) : '';

  const GoSkinResult = () => {
    window.location.href = `/skinresult?part1=${skinPart1Score}&part2=${skinPart2Score}&part3=${skinPart3Score}&part4=${skinPart4Score}&result=${skinResult}`;
  };

  const GoScalpResult = () => {
    window.location.href = `/scalpresult?part1=${scalpPart1Score}&part2=${scalpPart2Score}&part3=${scalpPart3Score}&part4=${scalpPart4Score}&result=${scalpResult}`;
  };

  return (
    <div className="Mypagetop">
      <h1 style={{ marginTop: '70px', fontSize: '40px' }}>My page</h1>
      <div className="Boxcontainer">
        <div className='Mypagebox1'>
          <h3 className='Mypagename'>{userData?.nickname || "회원"}님의 회원정보</h3>
          <button className="Mypagebtn1" onClick={() => handleNavigation('/mypage/eidtuser')}>회원정보 수정</button>
        </div>
        <div className='Mypagebox2'>
          <h3 className='Skintype'>나의 피부 MBTI는 ✔</h3>
          <p>{skRe}<br />{skinResultString}</p>
          <button className="Mypagebtn2" onClick={GoSkinResult}>결과표 보기</button>
        </div>
        <div className='Mypagebox3'>
          <h3 className='Scalptype'>나의 두피 MBTI는 ✔</h3>
          <p>{scRe}<br />{scalpResultString}</p>
          <button className="Mypagebtn3" onClick={GoScalpResult}>결과표 보기</button>
        </div>
        <div className='Mypagebox4'>
          <div className="wishlist-container">
            <img src="/wishlist.png" alt='wishlist' className='mypageimg'></img>
            <div className='movebtn'>
              <p className='mypagetext1'>찜한 상품</p>&nbsp;
              <button onClick={() => handleNavigation('/mypage/wishlist')} className='nav-button' style={{ cursor: 'pointer' }}>
                <img src="/move.png" alt="이동" className='move-icon' />
              </button>
            </div>
            <h3 className='mypagetext2'>{wishCount} 개</h3>
          </div>
          <div className="vertical-line1"></div>
          <div className="cart-container">
            <img src="/cart.png" alt='cart' className='mypageimg' style={{ marginTop: '22px' }}></img>
            <div className='movebtn'>
              <p className='mypagetext1'>장바구니</p>&nbsp;
              <button onClick={() => handleNavigation('/mypage/cartpage')} className='nav-button' style={{ cursor: 'pointer' }}>
                <img src="/move.png" alt="이동" className='move-icon' />
              </button>
            </div>
            <h3 className='mypagetext2'>{pendingOrderCount} 개</h3>
          </div>
          <div className="vertical-line2"></div>
          <div className="order-container">
            <img src="/truck.png" alt='truck' className='mypageimg' style={{ width: '50px', marginBottom: '-10px' }}></img>
            <div className='movebtn'>
              <p className='mypagetext1'>주문 상품</p>&nbsp;
              <button onClick={() => handleNavigation('/mypage/orderstatus')} className='nav-button' style={{ cursor: 'pointer' }}>
                <img src="/move.png" alt="이동" className='move-icon' />
              </button>
            </div>
            <h3 className='mypagetext2'>{paidOrderCount} 개</h3>
          </div>
          <div className="vertical-line3"></div>
          <div className="review-container">
            <img src="/review.png" alt='review' className='mypageimg' style={{ width: '40px', marginTop: '17px' }}></img>
            <div className='movebtn'>
              <p className='mypagetext1'>나의 상품 후기</p>&nbsp;
              <button onClick={() => handleNavigation('/mypage/myreview')} className='nav-button' style={{ cursor: 'pointer' }}>
                <img src="/move.png" alt="이동" className='move-icon' />
              </button>
            </div>
            <h3 className='mypagetext2'>{reviewCount} 개</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
