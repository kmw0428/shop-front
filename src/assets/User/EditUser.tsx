import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Auth/axiosInstance"; // axiosInstance 사용

interface User {
  id: string;
  username: string;
  password?: string;
  email: string;
  nickname: string;
  age: number;
  phoneNumber: string;
  address: string;
  gender: string;
  birthDate: string;
}

const EditUser: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
        const userId = localStorage.getItem("userId"); // 로컬 스토리지에서 사용자 ID 가져오기
        if (!userId) {
          setError("User ID not found");
          setLoading(false);
          return;
        }
      try {
        const response = await axiosInstance.get(`http://localhost:8080/api/users/${userId}`); // 현재 사용자 정보 엔드포인트
        console.log("User data fetched successfully:", response.data);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        await axiosInstance.put(`http://localhost:8080/api/users/${user.id}`, user);
        alert("Profile updated successfully");
        navigate("/mypage"); // 프로필 페이지로 이동
      } catch (error) {
        setError("Failed to update profile");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={user?.username}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            required
          />
          {password && (
            <button type="button" onClick={toggleShowPassword}>
              {showPassword ? "Hide" : "Show"}
            </button>
          )}
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={user?.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nickname: </label>
          <input
            type="text"
            name="nickname"
            value={user?.nickname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age: </label>
          <input
            type="text"
            name="age"
            value={user?.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone Number: </label>
          <input
            type="text"
            name="phoneNumber"
            value={user?.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address: </label>
          <input
            type="text"
            name="address"
            value={user?.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender: </label>
          <input
            type="text"
            name="gender"
            value={user?.gender}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Birth Date: </label>
          <input
            type="date"
            name="birthDate"
            value={user?.birthDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      <div>
        <a href="/diagnosisSkin">Skin Type Test</a>
        <a href="/diagnosisSclap">Scalp Type Test</a>
      </div>
    </div>
  );
};

export default EditUser;
