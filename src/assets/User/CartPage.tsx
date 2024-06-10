import React, { useState } from 'react';
import './CartPage.css';

interface Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
    isSelected: boolean;
    discount: number;
    savings: number;
}

const CartPage: React.FC = () => {
    const [cart, setCart] = useState<Product[]>([
        { id: 1, name: '탈모두피 세트', quantity: 1, price: 15000, imageUrl: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEyMTVfMTY4%2FMDAxNzAyNTY2MzU5Mjk5.VCxC9Wc0NpC5yRohb4g4xSwRBriPVT-u9B9t1PqFmBAg.Yb07KBUyYmWDxkNH8rnCfNR8WOVTHL6iHpAcEe87cS4g.JPEG.hanscos2180%2F290_2023_12_07.jpg&type=sc960_832', isSelected: false, discount: 0, savings: 0 },
        { id: 2, name: '정용덕 세트', quantity: 1, price: 20000, imageUrl: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA0MTFfMyAg%2FMDAxNzEyODIxNzA5Njk3.Bea8IFUnIn4SgSYg7UegXIq_RWmh62WS7wAyNY2HA-Eg.JWApVVA-Cg6ZyDuJAz6hT7u3pLezJ6QP2koAG1zBxd4g.JPEG%2F0267_2024_04_03.jpg&type=sc960_832', isSelected: false, discount: 0, savings: 0 },
        { id: 3, name: '정한길 크림', quantity: 2, price: 25000, imageUrl: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMTVfODkg%2FMDAxNzEwNDYxOTY5NzI3.Ef6rJoBPZMP1fArELRMJR-oVDNkmQx5804p3XcJJiPQg._x0Egbs7WcDgfplab3MJTbAmcDszWS6YxrmwGdSLXzgg.JPEG%2FIMG_6031.JPG&type=sc960_832', isSelected: false, discount: 0, savings: 0 },
    ]);

    const [selectAll, setSelectAll] = useState(false);

    const handleToggleSelectAll = () => {
        setSelectAll(!selectAll);
        setCart(cart.map(product => ({ ...product, isSelected: !selectAll })));
    };

    const handleRemoveSelected = () => {
        setCart(cart.filter(product => !product.isSelected));
    };

    const handleIncreaseQuantity = (id: number) => {
        setCart(cart.map(product =>
            product.id === id ? { ...product, quantity: product.quantity + 1 } : product
        ));
    };

    const handleDecreaseQuantity = (id: number) => {
        setCart(cart.map(product =>
            product.id === id && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
        ));
    };

    const handleToggleSelect = (id: number) => {
        setCart(cart.map(product =>
            product.id === id ? { ...product, isSelected: !product.isSelected } : product
        ));
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount).slice(1);
    };

    const getTotal = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const handleOrder = () => {
        alert('주문이 성공적으로 완료되었습니다!');
    };

    return (
        <div className="cartpage">
            <hr className='carthr1' />
            <div className="background-banner">
                <h1 style={{ fontSize: '3rem', marginBottom: '-20px', marginTop: '55px' }}>Shopping Cart</h1>
                <hr className='carthr2' />
                <table className='cart-table'>
                    <thead>
                        <tr>
                            <th className="select-col">
                                <label className="custom-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleToggleSelectAll}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </th>
                            <th className="product-col">상품명 / 옵션</th>
                            <th className="quantity-col">수량</th>
                            <th className="price-col">상품금액</th>
                            <th className="discount-col">할인 / 적립</th>
                            <th className="total-col">합계금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(product => (
                            <tr key={product.id}>
                                <td className="select-col">
                                    <label className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={product.isSelected}
                                            onChange={() => handleToggleSelect(product.id)}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                </td>
                                <td className="product-col">
                                    <div className="product-flex-container">
                                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                                        <span className='cartpdn'>{product.name}</span>
                                    </div>
                                </td>
                                <td className="quantity-col">
                                    <button onClick={() => handleDecreaseQuantity(product.id)}>-</button>
                                    {product.quantity}
                                    <button onClick={() => handleIncreaseQuantity(product.id)}>+</button>
                                </td>
                                <td className="price-col">{formatCurrency(product.price * product.quantity)}</td>
                                <td className="discount-col">{formatCurrency(product.discount)} / {formatCurrency(product.savings)}</td>
                                <td className="total-col">{formatCurrency(product.price * product.quantity)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="remove-selected" onClick={handleRemoveSelected}>선택 상품 삭제</button>
            </div>
            <div className="order-summary">
                <h2>주문 제품</h2>
                {cart.map(product => (
                    <div className="product-item" key={product.id}>
                        <img src={product.imageUrl} alt={product.name} />
                        <span className='product-imgtext'>
                            <strong>{product.name}</strong> <br></br> {formatCurrency(product.price * product.quantity)}원
                        </span>
                    </div>
                ))}
                <h2 className="total">합계 : {formatCurrency(getTotal())}원</h2>
                <button onClick={handleOrder}>주문 하기</button>
            </div>
        </div>
    );
};

export default CartPage;
