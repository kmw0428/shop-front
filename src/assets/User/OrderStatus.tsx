import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";

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
  const [expandedOrderIds, setExpandedOrderIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:8080/orders/user/${userId}`
        );
        const fetchedOrders: Order[] = response.data.filter(
          (order: Order) => order.status !== "PENDING"
        );
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const getStatusStep = (status: string) => {
    switch (status) {
      case "PAID":
        return 1;
      case "READY_TO_SHIP":
        return 2;
      case "SHIPPING":
        return 3;
      case "DELIVERED":
        return 4;
      default:
        return 0;
    }
  };

  const translateStatus = (status: string) => {
    switch (status) {
      case "PAID":
        return "결제 완료";
      case "READY_TO_SHIP":
        return "상품 확인 중";
      case "SHIPPING":
        return "배송 시작";
      case "DELIVERED":
        return "배송 중";
      default:
        return "알 수 없음";
    }
  };

  const handleOrderClick = (orderId: string) => {
    setExpandedOrderIds(prevExpandedOrderIds => {
      const newExpandedOrderIds = new Set(prevExpandedOrderIds);
      if (newExpandedOrderIds.has(orderId)) {
        newExpandedOrderIds.delete(orderId);
      } else {
        newExpandedOrderIds.add(orderId);
      }
      return newExpandedOrderIds;
    });
  };

  return (
    <div className="order-status-page">
      <h1>Order Status</h1>
      <hr className="order-hr" />
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order">
            {expandedOrderIds.has(order.id) && (
              <>
                <div className="progress-bar">
                  <div
                    className={`step ${
                      getStatusStep(order.status) >= 1 ? "active" : ""
                    }`}
                  >
                    <div className="circle"></div>
                    <div className="label">결제 완료</div>
                  </div>
                  <div
                    className={`step ${
                      getStatusStep(order.status) >= 2 ? "active" : ""
                    }`}
                  >
                    <div className="circle"></div>
                    <div className="label">상품 확인 중</div>
                  </div>
                  <div
                    className={`step ${
                      getStatusStep(order.status) >= 3 ? "active" : ""
                    }`}
                  >
                    <div className="circle"></div>
                    <div className="label">배송 시작</div>
                  </div>
                  <div
                    className={`step ${
                      getStatusStep(order.status) >= 4 ? "active" : ""
                    }`}
                  >
                    <div className="circle"></div>
                    <div className="label">배송 중</div>
                  </div>
                  <div
                    className={`step ${
                      getStatusStep(order.status) >= 5 ? "active" : ""
                    }`}
                  >
                    <div className="circle"></div>
                    <div className="label">배송 완료</div>
                  </div>
                </div>
                <p className="order-p1">
                  총 금액: {order.totalAmount.toLocaleString()}원
                </p>
                <hr className="ohp"></hr>
              </>
            )}
            <div className="order-products" onClick={() => handleOrderClick(order.id)}>
              {order.products.map((product) => (
                <div key={product.id} className="order-product">
                  <img
                    src={`http://localhost:8080${product.imageUrl}`}
                    alt={product.name}
                  />
                  <div className="order-product-details">
                    <div className="order-product-header">
                      <p>{product.name}</p>
                    </div>
                    <div className="order-product-footer">
                      <p>가격: {product.price.toLocaleString()}원</p>
                      <p>수량: {order.totalAmount / product.price}개</p>
                      <p>출고 상태: {translateStatus(order.status)}</p>
                    </div>
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
