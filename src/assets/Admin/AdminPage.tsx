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

interface User {
  id: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  role: string;
}

const AdminPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);  // 로딩 상태 추가
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
    if (!isLoading) {  // 관리자인 경우에만 데이터를 가져옴
      const fetchOrders = async () => {
        try {
          const response = await axios.get("http://localhost:8081/orders");
          setOrders(response.data);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
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
      fetchUsers();
    }
  }, [isLoading]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (selectedUserId) {
        try {
          const response = await axios.get(`http://localhost:8081/orders?userId=${selectedUserId}`);
          setUserOrders(response.data);
        } catch (error) {
          console.error(`Failed to fetch orders for user ${selectedUserId}:`, error);
          setUserOrders([]); // 에러 발생 시 빈 배열로 설정하여 "No orders found." 표시
        }
      } else {
        setUserOrders([]);
      }
    };

    fetchUserOrders();
  }, [selectedUserId]);

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await axios.put(`http://localhost:8081/orders/${orderId}/status`, null, {
        params: { status },
      });
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
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

  const handleUserClick = (userId: string) => {
    setSelectedUserId(prevSelectedUserId => (prevSelectedUserId === userId ? null : userId));
  };

  const filteredOrders = selectedUserId
    ? userOrders.filter(order => order.user?.id === selectedUserId)
    : orders;

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
                <p className="admin-user-info">Nickname: {user.nickname}</p>
                <p className="admin-user-info">Email: {user.email}</p>
                <p className="admin-user-info">Phone Number: {user.phoneNumber}</p>
                <p className="admin-user-info">Role: {user.role}</p>
                <button className="admin-delete-button" onClick={(e) => { e.stopPropagation(); deleteUser(user.id); }}>Delete User</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="admin-orders-section">
        <h2 className="admin-section-title">Orders</h2>
        {filteredOrders.length === 0 ? (
          <p className="admin-no-data">No orders found.</p>
        ) : (
          filteredOrders.map(order => {
            return (
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
                        <p className="admin-product-quantity">Quantity: {order.totalAmount / product.price}개</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="admin-status-buttons">
                  <button
                    className="admin-status-button"
                    onClick={() => updateOrderStatus(order.id, "READY_TO_SHIP")}
                    disabled={order.status === "PENDING"}
                  >
                    Ready to Ship
                  </button>
                  <button
                    className="admin-status-button"
                    onClick={() => updateOrderStatus(order.id, "SHIPPING")}
                    disabled={order.status === "PENDING"}
                  >
                    Shipping
                  </button>
                  <button
                    className="admin-status-button"
                    onClick={() => updateOrderStatus(order.id, "DELIVERING")}
                    disabled={order.status === "PENDING"}
                  >
                    Delivering
                  </button>
                  <button
                    className="admin-status-button"
                    onClick={() => updateOrderStatus(order.id, "DELIVERED")}
                    disabled={order.status === "PENDING"}
                  >
                    Delivered
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminPage;
