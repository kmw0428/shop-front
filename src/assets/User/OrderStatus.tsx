import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface Order {
  id: string;
  user: string;
  products: Product[];
  totalAmount: number;
  status: string;
  orderDate: Date;
}

const OrderStatus: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:8080/orders/user/${userId}`);
        const fetchedOrders: Order[] = response.data.filter((order: Order) => order.status !== "PENDING");
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PAID":
        return "결제 완료";
      case "READY_TO_SHIP":
        return "배송 준비 중";
      case "SHIPPING":
        return "배송 중";
      case "DELIVERED":
        return "배송 완료";
      default:
        return "알 수 없음";
    }
  };

  return (
    <div className="order-status-page">
      <h1>Order Status</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="order">
            <p>상태: {getStatusLabel(order.status)}</p>
            <p>총 금액: {order.totalAmount.toLocaleString()}원</p>
            <div className="products">
              {order.products.map(product => (
                <div key={product.id} className="product">
                  <img src={`http://localhost:8080${product.imageUrl}`} alt={product.name} />
                  <div>
                    <p>{product.name}</p>
                    <p>가격: {product.price.toLocaleString()}원</p>
                    <p>수량: {order.totalAmount / product.price}개</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderStatus;
