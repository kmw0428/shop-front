import React, { useEffect, useState } from 'react';
import './CartPage.css';
import axios from 'axios';

interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
    isSelected?: boolean;
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
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const getUserId = () => {
        return localStorage.getItem('userId');
    };

    const fetchOrders = async () => {
        const userId = getUserId();
        if (userId) {
            try {
                const response = await axios.get(`http://localhost:8080/orders/user/${userId}`);
                const orders: Order[] = response.data.map((order: Order) => ({
                    id: order.id,
                    user: order.user,
                    products: order.products.map((product: Product) => ({
                        ...product,
                        quantity: product.quantity || (order.totalAmount / product.price),
                        isSelected: false
                    })),
                    totalAmount: order.totalAmount,
                    status: order.status,
                    orderDate: new Date(order.orderDate)
                }));
                setOrders(orders);
                const allProducts = orders.flatMap(order => order.products);
                setProducts(allProducts);
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
        return products.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const updateProductTotalAmount = async (productId: string, newTotalAmount: number) => {
        try {
            const userId = getUserId();
            if (!userId) {
                alert('사용자 ID를 찾을 수 없습니다.');
                return;
            }

            // 서버에 총 금액 업데이트 요청
            await axios.put(`http://localhost:8080/orders/user/${userId}/products/${productId}`, null, {
                params: {
                    totalAmount: newTotalAmount
                }
            });

            // 로컬 상태 업데이트
            setProducts(prevProducts =>
                prevProducts.map(p =>
                    p.id === productId ? { ...p, quantity: newTotalAmount / p.price } : p
                )
            );
        } catch (error) {
            alert('총 금액 업데이트에 실패했습니다.');
            console.log(error);
        }
    };

    const handleIncreaseQuantity = (productId: string, currentQuantity: number, price: number) => {
        const newTotalAmount = (currentQuantity + 1) * price;
        updateProductTotalAmount(productId, newTotalAmount);
    };

    const handleDecreaseQuantity = (productId: string, currentQuantity: number, price: number) => {
        if (currentQuantity > 1) {
            const newTotalAmount = (currentQuantity - 1) * price;
            updateProductTotalAmount(productId, newTotalAmount);
        } else {
            alert('수량은 1 이상이어야 합니다.');
        }
    };

    const toggleProductSelection = (productId: string) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId ? { ...product, isSelected: !product.isSelected } : product
            )
        );
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        setProducts(prevProducts => prevProducts.map(product => ({ ...product, isSelected: !selectAll })));
    };

    const removeSelectedProducts = async () => {
        try {
            const selectedProducts = products.filter(product => product.isSelected);
            const selectedOrderIds = orders.filter(order => 
                order.products.some(product => selectedProducts.map(p => p.id).includes(product.id))
            ).map(order => order.id);

            if (selectedOrderIds.length === 0) {
                alert('선택된 항목이 없습니다.');
                return;
            }

            const confirmDelete = window.confirm('선택된 항목을 삭제하시겠습니까?');
            if (!confirmDelete) {
                return;
            }

            await Promise.all(selectedOrderIds.map(async (orderId) => {
                await axios.delete(`http://localhost:8080/orders/${orderId}`);
            }));

            setOrders(prevOrders => prevOrders.filter(order => !selectedOrderIds.includes(order.id)));
            setProducts(prevProducts => prevProducts.filter(product => !product.isSelected));
        } catch (error) {
            alert('선택된 항목을 삭제하는 데 실패했습니다.');
            console.log(error);
        }
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
                                        onChange={handleSelectAll}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </th>
                            <th className="product-col">상품명 / 옵션</th>
                            <th className="quantity-col">수량</th>
                            <th className="price-col">상품금액</th>
                            <th className="total-col">합계금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="select-col">
                                    <label className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={product.isSelected || false}
                                            onChange={() => toggleProductSelection(product.id)}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                </td>
                                <td className="product-col">
                                    <div className="product-flex-container">
                                        <img src={`http://localhost:8080${product.imageUrl}`} alt={product.name} className="product-image" />
                                        <span className='cartpdn'>{product.name}</span>
                                    </div>
                                </td>
                                <td className="quantity-col">
                                    <button onClick={() => handleDecreaseQuantity(product.id, product.quantity, product.price)}>-</button>
                                    {product.quantity}
                                    <button onClick={() => handleIncreaseQuantity(product.id, product.quantity, product.price)}>+</button>
                                </td>
                                <td className="price-col">{formatCurrency(product.price)}</td>
                                <td className="total-col">{formatCurrency(product.price * product.quantity)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="remove-selected" onClick={removeSelectedProducts}>선택 상품 삭제</button>
            </div>
            <div className="order-summary">
                <h2>주문 제품</h2>
                {products.map(product => (
                    <div className="product-item" key={product.id}>
                        <img src={`http://localhost:8080${product.imageUrl}`} alt={product.name} />
                        <span className='product-imgtext'>
                            <strong>{product.name}</strong> <br></br> {product.quantity}개
                        </span>
                    </div>
                ))}
                <h2 className="total">전체 합계 : {formatCurrency(getOverallTotal())}원</h2>
                <button>주문 하기</button>
            </div>
        </div>
    );
};

export default CartPage;
