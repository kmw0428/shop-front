import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ReqPass.css";

export default function RequestPasswordReset() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/reset-password",
        new URLSearchParams({ email })
      );
      const token = response.data.split(": ")[1];
      console.log(token);
      if (token) {
        navigate(`/resetpassword?token=${token}`);
      } else {
        alert("Failed to retrieve token");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        alert("User not found");
      } else {
        alert("An error occurred");
      }
    }
  };

  return (
    <>
      <p className="Req_p">비밀번호를 찾기 위해 이메일을 적어주세요.</p>
      <form onSubmit={handleSubmit} className="Req_form">
        <label className="Req_lab">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="Req_inp"
        />
        <button type="submit">Reset Password</button>
      </form>
    </>
  );
}
