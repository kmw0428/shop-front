import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./AdminPage.css";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface Order {
  id: string;
  user: { id: string; nickname: string } | null;
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

interface User {
  id: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  role: string;
}

const AdminPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([]);
  const [ordersMap, setOrdersMap] = useState<Map<string, Order>>(new Map());
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8081/api/users/${userId}`);
          const user: User = response.data;
          if (user.role !== "ROLE_ADMIN") {
            Swal.fire({
              title: "권한 없음",
              text: "관리자 권한이 필요합니다.",
              icon: "warning",
              confirmButtonText: "확인",
              customClass: {
                popup: "custom-swal-popup",
                title: "custom-swal-title",
                confirmButton: "custom-swal-confirm-button",
              },
            }).then(() => {
              navigate("/"); // 관리자가 아니면 홈으로 리디렉션
            });
          } else {
            setIsLoading(false);  // 관리자가 확인되면 로딩 상태 해제
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          Swal.fire({
            title: "에러 발생",
            text: "사용자 정보를 가져오는 데 실패했습니다.",
            icon: "error",
            confirmButtonText: "확인",
            customClass: {
              popup: "custom-swal-popup",
              title: "custom-swal-title",
              confirmButton: "custom-swal-confirm-button",
            },
          }).then(() => {
            navigate("/"); // 에러 발생 시 홈으로 리디렉션
          });
        }
      } else {
        Swal.fire({
          title: "로그인 필요",
          text: "로그인이 필요합니다.",
          icon: "warning",
          confirmButtonText: "로그인",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
        }).then(() => {
          navigate("/login"); // 로그인하지 않은 경우 로그인 페이지로 리디렉션
        });
      }
    };

    checkUserRole();
  }, [navigate]);

  useEffect(() => {
    if (!isLoading) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get("http://localhost:8081/orders");
          const pendingOrders = response.data.filter((order: Order) => order.status === "PENDING");
          setOrders(pendingOrders);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      };

      const fetchOrderStatuses = async () => {
        try {
          const response = await axios.get("http://localhost:8081/orders/orderstatuses");
          setOrderStatuses(response.data);

          const orderIds = response.data.flatMap((orderStatus: OrderStatus) => orderStatus.orders.map(order => typeof order === 'string' ? order : order.id));
          const ordersData = await Promise.all(orderIds.map((orderId: string) => fetchOrderById(orderId)));
          const ordersMap = new Map(ordersData.filter(order => order).map(order => [order.id, order]));
          setOrdersMap(ordersMap);
        } catch (error) {
          console.error("Failed to fetch order statuses:", error);
        }
      };

      const fetchUsers = async () => {
        try {
          const response = await axios.get("http://localhost:8081/api/users");
          setUsers(response.data);
        } catch (error) {
          console.error("Failed to fetch users:", error);
        }
      };

      fetchOrders();
      fetchOrderStatuses();
      fetchUsers();
    }
  }, [isLoading]);

  const fetchOrderById = async (orderId: string) => {
    try {
      const response = await axios.get(`http://localhost:8081/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch order:", error);
      return null;
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await axios.put(`http://localhost:8081/orders/${orderId}/status`, null, {
        params: { status },
      });
      setOrdersMap(prevOrders => {
        const updatedOrder = prevOrders.get(orderId);
        if (updatedOrder) {
          updatedOrder.status = status;
          return new Map(prevOrders).set(orderId, updatedOrder);
        }
        return prevOrders;
      });
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const updateOrderStatusByStatusId = async (statusId: string, status: string) => {
    const orderStatus = orderStatuses.find(orderStatus => orderStatus.id === statusId);
    if (!orderStatus) return;
    try {
      await Promise.all(
        orderStatus.orders.map(async (order) => {
          const orderId = typeof order === 'string' ? order : order.id;
          await updateOrderStatus(orderId, status);
        })
      );
      setOrdersMap(prevOrders => {
        const updatedOrdersMap = new Map(prevOrders);
        orderStatus.orders.forEach(order => {
          const orderId = typeof order === 'string' ? order : order.id;
          const updatedOrder = updatedOrdersMap.get(orderId);
          if (updatedOrder) {
            updatedOrder.status = status;
            updatedOrdersMap.set(orderId, updatedOrder);
          }
        });
        return updatedOrdersMap;
      });
    } catch (error) {
      console.error("Failed to update order statuses by status id:", error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:8081/api/users/${userId}`);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleDeleteUser = (userId: string) => {
    Swal.fire({
      title: "사용자 삭제",
      text: "정말로 사용자를 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        confirmButton: "custom-swal-confirm-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(userId);
      }
    });
  };

  const handleUserClick = async (userId: string) => {
    setSelectedUserId(prevSelectedUserId => (prevSelectedUserId === userId ? null : userId));

    if (userId) {
      try {
        const ordersResponse = await axios.get(`http://localhost:8081/orders/user/${userId}`);
        setOrders(ordersResponse.data.filter((order: Order) => order.status === "PENDING"));

        const orderStatusesResponse = await axios.get(`http://localhost:8081/orders/${userId}/status`);
        setOrderStatuses(orderStatusesResponse.data);

        const orderIds = orderStatusesResponse.data.flatMap((orderStatus: OrderStatus) => orderStatus.orders.map(order => typeof order === 'string' ? order : order.id));
        const ordersData = await Promise.all(orderIds.map((orderId: string) => fetchOrderById(orderId)));
        const ordersMap = new Map(ordersData.filter(order => order).map(order => [order.id, order]));
        setOrdersMap(ordersMap);
      } catch (error) {
        console.error(`Failed to fetch orders or order statuses for user ${userId}:`, error);
      }
    } else {
      setOrders([]);
      setOrderStatuses([]);
    }
  };

  const filteredOrderStatuses = selectedUserId
    ? orderStatuses.filter(orderStatus => orderStatus.user === selectedUserId)
    : orderStatuses;

  if (isLoading) {
    return null;  // 로딩 중일 때는 아무것도 렌더링하지 않음
  }

  return (
    <div className="admin-page">
      <h1 className="admin-title">Admin Page</h1>
      <div className="admin-users-section">
        <h2 className="admin-section-title">Users</h2>
        {users.length === 0 ? (
          <p className="admin-no-data">No users found.</p>
        ) : (
          <ul className="admin-users-list">
            {users.map(user => (
              <li
                key={user.id}
                className={`admin-user-item ${selectedUserId === user.id ? 'selected' : ''}`}
                onClick={() => handleUserClick(user.id)}
              >
                <p className="admin-user-info">Name: {user.nickname}</p>
                <p className="admin-user-info">Email: {user.email}</p>
                <p className="admin-user-info">Phone Number: {user.phoneNumber}</p>
                <p className="admin-user-info">Role: {user.role}</p>
                <button className="admin-delete-button" onClick={(e) => { e.stopPropagation(); handleDeleteUser(user.id); }}>Delete User</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="admin-orders-section">
        <h2 className="admin-section-title">Pending Orders</h2>
        {orders.length === 0 ? (
          <p className="admin-no-data">No pending orders found.</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="admin-order">
              <p className="admin-order-info">User: {order.user?.nickname || "Unknown"}</p>
              <p className="admin-order-info">Status: {order.status}</p>
              <p className="admin-order-info">Total Amount: {order.totalAmount.toLocaleString()}원</p>
              <div className="admin-products">
                {order.products.map(product => (
                  <div key={product.id} className="admin-product">
                    <img className="admin-product-image" src={`http://localhost:8081${product.imageUrl}`} alt={product.name} />
                    <div className="admin-product-details">
                      <p className="admin-product-name">{product.name}</p>
                      <p className="admin-product-price">Price: {product.price.toLocaleString()}원</p>
                      <p className="admin-product-quantity">Quantity: {order.quantity}개</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="admin-orders-section">
        <h2 className="admin-section-title">Order Statuses</h2>
        {filteredOrderStatuses.length === 0 ? (
          <p className="admin-no-data">No order statuses found.</p>
        ) : (
          filteredOrderStatuses.map((orderStatus) => (
            <div key={orderStatus.id} className="order-status">
              <p className="admin-order-info">Order Status ID: {orderStatus.id}</p>
              <div className="admin-products">
                {orderStatus.orders.map((order) => {
                  const orderId = typeof order === 'string' ? order : order.id;
                  const orderData = ordersMap.get(orderId);
                  return orderData ? (
                    <div key={orderData.id} className="admin-order">
                      <p className="admin-order-info">User: {orderData.user?.nickname || "Unknown"}</p>
                      <p className="admin-order-info">Status: {orderData.status}</p>
                      <p className="admin-order-info">Total Amount: {orderData.totalAmount.toLocaleString()}원</p>
                      <div className="admin-products">
                        {orderData.products.map(product => (
                          <div key={product.id} className="admin-product">
                            <img className="admin-product-image" src={`http://localhost:8081${product.imageUrl}`} alt={product.name} />
                            <div className="admin-product-details">
                              <p className="admin-product-name">{product.name}</p>
                              <p className="admin-product-price">Price: {product.price.toLocaleString()}원</p>
                              <p className="admin-product-quantity">Quantity: {orderData.quantity}개</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p key={orderId}>Loading order details...</p>
                  );
                })}
              </div>
              <div className="admin-status-buttons">
                <button
                  className="admin-status-button"
                  onClick={() => updateOrderStatusByStatusId(orderStatus.id, "READY_TO_SHIP")}
                >
                  Ready to Ship All
                </button>
                <button
                  className="admin-status-button"
                  onClick={() => updateOrderStatusByStatusId(orderStatus.id, "SHIPPING")}
                >
                  Ship All
                </button>
                <button
                  className="admin-status-button"
                  onClick={() => updateOrderStatusByStatusId(orderStatus.id, "DELIVERING")}
                >
                  Deliver All
                </button>
                <button
                  className="admin-status-button"
                  onClick={() => updateOrderStatusByStatusId(orderStatus.id, "DELIVERED")}
                >
                  Mark All as Delivered
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPage;
