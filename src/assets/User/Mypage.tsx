import React from 'react';
import './Mypage.css'

const Mypage: React.FC = () => {
    const handleNavigation = (url: string) => {
        window.location.href = url;
    };
    return (
        <div className="Mypagetop">
            <h1 style={{ marginTop: '25px', fontSize: '40px' }}>My page</h1>
            <div className="Boxcontainer">
                <div className='Mypagebox1'>
                    <h3 className='Mypagename'>{"ㅇㅇㅇ"}님의 회원정보</h3>
                    <button className="Mypagebtn1">회원정보 수정</button>
                </div>
                <div className='Mypagebox2'>
                    <h3 className='Skintype'>나의 피부 MBTI는 ✔</h3>
                    <p>{"skintype"}</p>
                    <button className="Mypagebtn2">결과표 보기</button>
                </div>
                <div className='Mypagebox3'>
                    <h3 className='Scalptype'>나의 두피 MBTI는 ✔</h3>
                    <p>{"scalptype"}</p>
                    <button className="Mypagebtn3">결과표 보기</button>
                </div>
                <div className='Mypagebox4'>
                    <div className="wishlist-container">
                        <img src="/wishlist.png" alt='wishlist' className='mypageimg'></img>
                        <div className='movebtn'>
                            <p className='mypagetext1'>찜한 상품</p>&nbsp;
                            <button onClick={() => handleNavigation('/wishlist')} className='nav-button' style={{ cursor: 'pointer' }}>
                                <img src="/move.png" alt="이동" className='move-icon' />
                            </button>
                        </div>
                        <h3 className='mypagetext2'>{"0"} 개</h3>
                    </div>
                    <div className="vertical-line1"></div>
                    <div className="cart-container">
                        <img src="/cart.png" alt='cart' className='mypageimg' style={{ marginTop: '22px' }}></img>
                        <div className='movebtn'>
                            <p className='mypagetext1'>장바구니</p>&nbsp;
                            <button onClick={() => handleNavigation('/cartpage')} className='nav-button' style={{ cursor: 'pointer' }}>
                                <img src="/move.png" alt="이동" className='move-icon' />
                            </button>
                        </div>
                        <h3 className='mypagetext2'>{"0"} 개</h3>
                    </div>
                    <div className="vertical-line2"></div>
                    <div className="order-container">
                        <img src="/truck.png" alt='truck' className='mypageimg' style={{ width: '50px', marginBottom: '-10px' }}></img>
                        <div className='movebtn'>
                            <p className='mypagetext1'>주문 상품</p>&nbsp;
                            <button onClick={() => handleNavigation('/')} className='nav-button' style={{ cursor: 'pointer' }}>
                                <img src="/move.png" alt="이동" className='move-icon' />
                            </button>
                        </div>
                        <h3 className='mypagetext2'>{"0"} 개</h3>
                    </div>
                    <div className="vertical-line3"></div>
                    <div className="review-container">
                        <img src="/review.png" alt='review' className='mypageimg' style={{ width: '40px', marginTop: '17px' }}></img>
                        <div className='movebtn'>
                            <p className='mypagetext1'>나의 상품 후기</p>&nbsp;
                            <button onClick={() => handleNavigation('/reviewpage')} className='nav-button' style={{ cursor: 'pointer' }}>
                                <img src="/move.png" alt="이동" className='move-icon' />
                            </button>
                        </div>
                        <h3 className='mypagetext2'>{"0"} 개</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mypage;