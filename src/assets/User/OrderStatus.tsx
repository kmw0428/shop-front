import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface Order {
  id: string;
  user: string;
  products: Product[];
  totalAmount: number;
  status: string;
  orderDate: Date;
  quantity: number;
}

interface OrderStatus {
  id: string;
  orders: (string | { id: string })[];
  user: string;
}

const OrderStatusComponent: React.FC = () => {
  const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([]);
  const [ordersMap, setOrdersMap] = useState<Map<string, Order>>(new Map());

  useEffect(() => {
    const fetchOrderStatuses = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`http://1.226.84.83:8081/orders/${userId}/status`);
        setOrderStatuses(response.data);

        const orderIds = response.data.flatMap((orderStatus: OrderStatus) => orderStatus.orders.map(order => typeof order === 'string' ? order : order.id));
        const ordersData = await Promise.all(orderIds.map((orderId: string) => fetchOrderById(orderId)));
        const ordersMap = new Map(ordersData.filter(order => order).map(order => [order.id, order]));
        setOrdersMap(ordersMap);

      } catch (error) {
        console.error("Failed to fetch order statuses:", error);
      }
    };

    fetchOrderStatuses();
  }, []);

  const fetchOrderById = async (orderId: string) => {
    try {
      const response = await axios.get(`http://1.226.84.83:8081/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch order:", error);
      return null;
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case "PAID":
        return 1;
      case "READY_TO_SHIP":
        return 2;
      case "SHIPPING":
        return 3;
      case "DELIVERING":
        return 4;
      case "DELIVERED":
        return 5;
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
      case "DELIVERING":
        return "배송 중";
      case "DELIVERED":
        return "배송 완료";
      default:
        return "알 수 없음";
    }
  };

  const getMaxStatus = (orders: Order[]) => {
    const statusPriority = ["PAID", "READY_TO_SHIP", "SHIPPING", "DELIVERING", "DELIVERED"];
    return orders.reduce((maxStatus, order) => {
      return statusPriority.indexOf(order.status) > statusPriority.indexOf(maxStatus) ? order.status : maxStatus;
    }, "PAID");
  };

  const getTotalAmount = (orders: Order[]) => {
    return orders.reduce((total, order) => total + order.totalAmount, 0);
  };

  const getTotalQuantity = (orders: Order[], productId: string) => {
    return orders.reduce((total, order) => {
      const product = order.products.find(product => product.id === productId);
      return product ? total + order.quantity : total;
    }, 0);
  };

  return (
    <div className="order-status-page">
      <h1>Order Status</h1>
      <hr className="order-hr" />
      {orderStatuses.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orderStatuses.map((orderStatus) => {
          const mergedOrders = orderStatus.orders.map((order) => {
            const orderId = typeof order === 'string' ? order : order.id;
            return ordersMap.get(orderId);
          }).filter(order => order) as Order[];

          const maxStatus = getMaxStatus(mergedOrders);
          const totalAmount = getTotalAmount(mergedOrders);
          const products = mergedOrders.flatMap(order => order.products);

          return (
            <div key={orderStatus.id} className="order-status">
              <div className="order">
                <div className="progress-bar">
                  <div className={`step ${getStatusStep(maxStatus) >= 1 ? "active" : ""}`}>
                    <div className="circle"></div>
                    <div className="label">결제 완료</div>
                  </div>
                  <div className={`step ${getStatusStep(maxStatus) >= 2 ? "active" : ""}`}>
                    <div className="circle"></div>
                    <div className="label">상품 확인 중</div>
                  </div>
                  <div className={`step ${getStatusStep(maxStatus) >= 3 ? "active" : ""}`}>
                    <div className="circle"></div>
                    <div className="label">배송 시작</div>
                  </div>
                  <div className={`step ${getStatusStep(maxStatus) >= 4 ? "active" : ""}`}>
                    <div className="circle"></div>
                    <div className="label">배송 중</div>
                  </div>
                  <div className={`step ${getStatusStep(maxStatus) >= 5 ? "active" : ""}`}>
                    <div className="circle"></div>
                    <div className="label">배송 완료</div>
                  </div>
                </div>
                <p className="order-p1">총 금액: {totalAmount.toLocaleString()}원</p>
                <hr className="ohp" />
                <div className="order-products">
                  {products.map((product, index) => (
                    <div key={`${product.id}-${index}`} className="order-product">
                      <img src={`http://1.226.84.83:8081${product.imageUrl}`} alt={product.name} />
                      <div className="order-product-details">
                        <div className="order-product-header">
                          <p>{product.name}</p>
                        </div>
                        <div className="order-product-footer">
                          <p>가격: {product.price.toLocaleString()}원</p>
                          <p>수량: {getTotalQuantity(mergedOrders, product.id)}개</p> {/* order의 quantity 사용 */}
                          <p>출고 상태: {translateStatus(maxStatus)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrderStatusComponent;
