import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPage.css";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface Order {
  id: string;
  user: { id: string; nickname: string } | null; // 사용자 정보를 객체로 정의, null 허용
  products: Product[];
  totalAmount: number;
  status: string;
  orderDate: Date;
}

interface User {
  id: string; // 사용자 ID를 문자열로 정의
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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchOrders();
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (selectedUserId) {
        try {
          const response = await axios.get(`http://localhost:8080/orders?userId=${selectedUserId}`);
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
      await axios.put(`http://localhost:8080/orders/${orderId}/status`, null, {
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
      await axios.delete(`http://localhost:8080/api/users/${userId}`);
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
                {/* User 정보 가져오기 */}
                <p className="admin-order-info">User: {order.user?.nickname || "Unknown"}</p>
                <p className="admin-order-info">Status: {order.status}</p>
                <p className="admin-order-info">Total Amount: {order.totalAmount.toLocaleString()}원</p>
                <div className="admin-products">
                  {order.products.map(product => (
                    <div key={product.id} className="admin-product">
                      <img className="admin-product-image" src={`http://localhost:8080${product.imageUrl}`} alt={product.name} />
                      <div className="admin-product-details">
                        <p className="admin-product-name">{product.name}</p>
                        <p className="admin-product-price">Price: {product.price.toLocaleString()}원</p>
                        <p className="admin-product-quantity">Quantity: {order.totalAmount / product.price}개</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="admin-status-buttons">
                  {/* 주문 상태 업데이트 버튼 */}
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
