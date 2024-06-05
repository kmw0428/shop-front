import React, { useState } from 'react';

// Product 인터페이스 정의
interface Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
}

// CartPage 컴포넌트 정의
const CartPage: React.FC = () => {
    // 장바구니 상태 정의 및 초기화
    const [cart, setCart] = useState<Product[]>([
        { id: 1, name: '스킨케어 세트', quantity: 1, price: 150, imageUrl: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEyMTVfMTY4%2FMDAxNzAyNTY2MzU5Mjk5.VCxC9Wc0NpC5yRohb4g4xSwRBriPVT-u9B9t1PqFmBAg.Yb07KBUyYmWDxkNH8rnCfNR8WOVTHL6iHpAcEe87cS4g.JPEG.hanscos2180%2F290_2023_12_07.jpg&type=sc960_832' },
        { id: 2, name: '바디케어 세트', quantity: 1, price: 200, imageUrl: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA0MTFfMyAg%2FMDAxNzEyODIxNzA5Njk3.Bea8IFUnIn4SgSYg7UegXIq_RWmh62WS7wAyNY2HA-Eg.JWApVVA-Cg6ZyDuJAz6hT7u3pLezJ6QP2koAG1zBxd4g.JPEG%2F0267_2024_04_03.jpg&type=sc960_832' },
        { id: 3, name: '수분 크림', quantity: 2, price: 250, imageUrl: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMTVfODkg%2FMDAxNzEwNDYxOTY5NzI3.Ef6rJoBPZMP1fArELRMJR-oVDNkmQx5804p3XcJJiPQg._x0Egbs7WcDgfplab3MJTbAmcDszWS6YxrmwGdSLXzgg.JPEG%2FIMG_6031.JPG&type=sc960_832' },
    ]);

    // 제품을 장바구니에서 제거하는 함수
    const handleRemove = (id: number) => {
        setCart(cart.filter(product => product.id !== id));
    };

    // 제품 수량을 증가시키는 함수
    const handleIncreaseQuantity = (id: number) => {
        setCart(cart.map(product =>
            product.id === id ? { ...product, quantity: product.quantity + 1 } : product
        ));
    };

    // 제품 수량을 감소시키는 함수
    const handleDecreaseQuantity = (id: number) => {
        setCart(cart.map(product =>
            product.id === id && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
        ));
    };

    // 장바구니 총합 계산 함수
    const getTotal = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    // 주문 버튼 클릭 시 호출되는 함수
    const handleOrder = () => {
        alert('주문이 성공적으로 완료되었습니다!');
        // 실제 주문 처리 로직 추가
    };

    return (
        <div className='cartpage'>
            <hr className='carthr1'></hr>
            <div style={{ flex: 3 }}>
                <h1>Shopping Cart</h1>
                <table>
                    <thead>
                        <tr>
                            <th>제품이미지</th> {/* 이미지 열 */}
                            <th>제품명</th> {/* 제품명 열 */}
                            <th>수량</th> {/* 수량 열 */}
                            <th>가격</th> {/* 가격 열 */}
                            <th>삭제</th> {/* 삭제 열 */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* 장바구니에 있는 각 제품을 테이블 행으로 렌더링 */}
                        {cart.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img src={product.imageUrl} alt={product.name} width="50" height="50" /> {/* 제품 이미지 */}
                                </td>
                                <td>{product.name}</td> {/* 제품명 */}
                                <td>
                                    <button onClick={() => handleDecreaseQuantity(product.id)}>-</button>
                                    {product.quantity}
                                    <button onClick={() => handleIncreaseQuantity(product.id)}>+</button>
                                </td> {/* 수량 */}
                                <td>${product.price * product.quantity}</td> {/* 가격 */}
                                <td>
                                    <button onClick={() => handleRemove(product.id)}>삭제</button> {/* 삭제 버튼 */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h2>주문 제품</h2>
                {cart.map(product => (
                    <div key={product.id}>
                        <strong>{product.name}</strong> . . . ${product.price * product.quantity}
                    </div>
                ))}
                <h2>합계 : ${getTotal()}</h2> {/* 총합 금액 */}
                <button onClick={handleOrder}>주문 하기</button> {/* 주문 버튼 */}
            </div>
        </div>
    );
};

export default CartPage;
