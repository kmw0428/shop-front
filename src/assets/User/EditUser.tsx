import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Auth/axiosInstance"; // axiosInstance 사용
import "./EditUser.css";

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

interface DaumPostcodeData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
}

declare global {
  interface Window {
    daum: unknown;
  }
}

const EditUser: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string | null>(null);
  const [postcode, setPostcode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");
  const [extraAddress, setExtraAddress] = useState<string>("");

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
        const response = await axiosInstance.get(
          `http://localhost:8080/api/users/${userId}`
        ); // 현재 사용자 정보 엔드포인트
        console.log("User data fetched successfully:", response.data);
        setUser(response.data);

        // address가 존재하는지 확인 후 분리하여 상태에 저장
        if (response.data.address) {
          const [postcodePart, addressPart, detailPart, extraPart] =
            response.data.address.split("||");
          setPostcode(postcodePart || "");
          setAddress(addressPart || "");
          setDetailAddress(detailPart || "");
          setExtraAddress(extraPart || "");
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    const handleComplete = (data: DaumPostcodeData) => {
      let fullAddress = data.address;
      let extraAddress = "";

      if (data.addressType === "R") {
        if (data.bname !== "") {
          extraAddress += data.bname;
        }
        if (data.buildingName !== "") {
          extraAddress +=
            extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      }

      setPostcode(data.zonecode);
      setAddress(fullAddress);
      setExtraAddress(extraAddress);
    };

    const openPostcode = () => {
      new window.daum.Postcode({
        oncomplete: handleComplete,
      }).open();
    };

    script.onload = () => {
      const postcodeButton = document.getElementById("postcode-btn");
      if (postcodeButton) {
        postcodeButton.addEventListener("click", openPostcode);
      }
    };

    return () => {
      const postcodeButton = document.getElementById("postcode-btn");
      if (postcodeButton) {
        postcodeButton.removeEventListener("click", openPostcode);
      }
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "detailAddress") {
      setDetailAddress(value);
    } else if (name === "extraAddress") {
      setExtraAddress(value);
    } else if (user) {
      setUser({ ...user, [name]: value });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        await axiosInstance.put(`http://localhost:8080/api/users/${user.id}`, {
          ...user,
          address: `${postcode}||${address}||${detailAddress}||${extraAddress}`,
        });
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
    <div className="edit-user">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="eu-input">
          <label className="eu-inputl">Username: </label>
          <input
            type="text"
            name="username"
            value={user?.username || ""}
            onChange={handleChange}
            readOnly
            className="euInp"
          />
        </div>
        <div className="eu-input">
          <label className="eu-inputl">Password: </label>
          <div className="eu-bt">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password || ""}
              onChange={handleChange}
              required
              className="euInp"
            />
            {password && (
              <button
                type="button"
                onClick={toggleShowPassword}
                className="show-password-btn"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            )}
          </div>
        </div>
        <div className="eu-input">
          <label className="eu-inputl">Email: </label>
          <input
            type="email"
            name="email"
            value={user?.email || ""}
            onChange={handleChange}
            className="euInp"
          />
        </div>
        <div className="eu-input">
          <label className="eu-inputl">Nickname: </label>
          <input
            type="text"
            name="nickname"
            value={user?.nickname || ""}
            onChange={handleChange}
            className="euInp"
          />
        </div>
        <div className="eu-input">
          <label className="eu-inputl">Age: </label>
          <input
            type="text"
            name="age"
            value={user?.age || ""}
            onChange={handleChange}
            className="euInp"
          />
        </div>
        <div className="eu-input">
          <label className="eu-inputl">Phone Number: </label>
          <input
            type="text"
            name="phoneNumber"
            value={user?.phoneNumber || ""}
            onChange={handleChange}
            className="euInp"
          />
        </div>
        <div className="eu-input">
          <label className="eu-inputl">Postcode: </label>
          <input
            type="text"
            name="postcode"
            value={postcode}
            readOnly
            className="euInp-1"
          />
          <button type="button" id="postcode-btn">
            우편번호 찾기
          </button>
        </div>
        <div className="eu-input">
          <label className="eu-inputl">Address: </label>
          <input
            type="text"
            name="address"
            value={address}
            readOnly
            className="euInp"
          />
        </div>
        <div className="eu-input">
          <label className="eu-inputl">Detail Address: </label>
          <input
            type="text"
            name="detailAddress"
            value={detailAddress}
            onChange={handleChange}
            className="euInp"
          />
        </div>
        <div className="eu-input">
          <label className="eu-inputl">Extra Address: </label>
          <input
            type="text"
            name="extraAddress"
            value={extraAddress}
            onChange={handleChange}
            className="euInp"
          />
        </div>
        <div className="eu-input">
          <label className="eu-inputl">Gender: </label>
          <input
            type="text"
            name="gender"
            value={user?.gender || ""}
            onChange={handleChange}
            className="euInp"
          />
        </div>
        <div className="eu-input">
          <label className="eu-inputl">Birth Date: </label>
          <input
            type="date"
            name="birthDate"
            value={user?.birthDate || ""}
            onChange={handleChange}
            className="euInp"
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      <div className="test-links">
        <a href="/diagnosisSkin">Skin Type Test</a>
        <a href="/diagnosisSclap">Scalp Type Test</a>
      </div>
    </div>
  );
};

export default EditUser;
