import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './ConfirmPasswordReset.css';  // CSS 파일 임포트

export default function ConfirmPasswordReset() {
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tokenFromURL = queryParams.get('token');
        if (tokenFromURL) {
            setToken(tokenFromURL);
        } else {
            alert('Invalid or missing token');
            navigate('/');
        }
    }, [location, navigate])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://shoppingback-ltd0.onrender.com/api/auth/confirm-reset',
                new URLSearchParams({ token, newPassword }), // x-www-form-urlencoded 형식으로 데이터 전송
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );
            alert(response.data);
            navigate('/login')
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 400) {
                    alert('Invalid token');
                } else {
                    alert(error.response.data.message || 'An error occurred');
                }
            } else {
                alert('An error occurred');
            }
        }
    };

    return (
        <div className="cpr-container">
            <form onSubmit={handleSubmit} className="cpr-form">
                <label className="cpr-label">Token</label>
                <input
                    type="text"
                    value={token}
                    readOnly
                    className="cpr-input"
                />
                <label className="cpr-label">New Password</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="cpr-input"
                />
                <button type="submit" className="cpr-button">Confirm Reset</button>
            </form>
        </div>
    );
}
