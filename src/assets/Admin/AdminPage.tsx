import React, { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <div className="users-section">
        <h2>Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <p>Nickname: {user.nickname}</p>
                <p>Email: {user.email}</p>
                <p>Phone Number: {user.phoneNumber}</p>
                <p>Role: {user.role}</p>
                <button onClick={() => deleteUser(user.id)}>Delete User</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="orders-section">
        <h2>Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order">
              <p>Status: {order.status}</p>
              <p>Total Amount: {order.totalAmount.toLocaleString()}원</p>
              <div className="products">
                {order.products.map(product => (
                  <div key={product.id} className="product">
                    <img src={`http://localhost:8080${product.imageUrl}`} alt={product.name} />
                    <div>
                      <p>{product.name}</p>
                      <p>Price: {product.price.toLocaleString()}원</p>
                      <p>Quantity: {order.totalAmount / product.price}개</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="status-buttons">
                <button 
                  onClick={() => updateOrderStatus(order.id, "READY_TO_SHIP")} 
                  disabled={order.status === "PENDING"}
                >
                  Ready to Ship
                </button>
                <button 
                  onClick={() => updateOrderStatus(order.id, "SHIPPING")} 
                  disabled={order.status === "PENDING"}
                >
                  Shipping
                </button>
                <button 
                  onClick={() => updateOrderStatus(order.id, "DELIVERED")} 
                  disabled={order.status === "PENDING"}
                >
                  Delivered
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
