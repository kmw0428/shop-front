import React, { useEffect, useState } from 'react';
import './CartPage.css';
import axios from 'axios';

interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

interface Order {
    id: string;
    user: string;
    products: Product[];
    totalAmount: number;
    status: string;
    orderDate: Date;
}

const CartPage: React.FC = () => {
    const [, setOrders] = useState<Order[]>([]);
    const [combinedProducts, setCombinedProducts] = useState<Product[]>([]);

    const getUserId = () => {
        return localStorage.getItem('userId');
    };

    const combineProducts = (products: Product[]): Product[] => {
        const productMap: { [key: string]: Product } = {};

        products.forEach(product => {
            if (productMap[product.id]) {
                productMap[product.id].quantity += product.quantity;
            } else {
                productMap[product.id] = { ...product };
            }
        });

        console.log("Combined Products:", Object.values(productMap));
        return Object.values(productMap);
    };

    const fetchOrders = async () => {
        const userId = getUserId();
        if (userId) {
            try {
                const response = await axios.get(`http://localhost:8080/orders/user/${userId}`);
                const orders: Order[] = response.data.map((order: Order) => {
                    const combinedProducts = combineProducts(order.products.map((product: Product) => ({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl,
                        quantity: product.quantity || (order.totalAmount / product.price)
                    })));

                    return {
                        id: order.id,
                        user: order.user,
                        products: combinedProducts,
                        totalAmount: order.totalAmount,
                        status: order.status,
                        orderDate: new Date(order.orderDate)
                    };
                });
                setOrders(orders);

                const allProducts = orders.flatMap(order => order.products);
                const combined = combineProducts(allProducts);
                setCombinedProducts(combined);

                console.log("Fetched Orders:", orders);
            } catch (error) {
                alert('주문 데이터를 가져오는 데 실패했습니다.');
                console.log(error);
            }
        } else {
            alert('사용자 ID를 찾을 수 없습니다.');
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount).slice(1);
    };

    const getOverallTotal = () => {
        return combinedProducts.reduce((total, product) => total + product.price * product.quantity, 0);
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
                            <th className="product-col">상품명 / 옵션</th>
                            <th className="quantity-col">수량</th>
                            <th className="price-col">상품금액</th>
                            <th className="total-col">합계금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {combinedProducts.map(product => (
                            <tr key={product.id}>
                                <td className="product-col">
                                    <div className="product-flex-container">
                                        <img src={`http://localhost:8080${product.imageUrl}`} alt={product.name} className="product-image" />
                                        <span className='cartpdn'>{product.name}</span>
                                    </div>
                                </td>
                                <td className="quantity-col">{product.quantity}</td>
                                <td className="price-col">{formatCurrency(product.price)}</td>
                                <td className="total-col">{formatCurrency(product.price * product.quantity)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="order-summary">
                <h2>주문 제품</h2>
                {combinedProducts.map(product => (
                    <div className="product-item" key={product.id}>
                        <img src={`http://localhost:8080${product.imageUrl}`} alt={product.name} />
                        <span className='product-imgtext'>
                            <strong>{product.name}</strong> <br></br> {formatCurrency(product.price * product.quantity)}원
                        </span>
                    </div>
                ))}
                <h2 className="total">전체 합계 : {formatCurrency(getOverallTotal())}원</h2>
            </div>
        </div>
    );
};

export default CartPage;
