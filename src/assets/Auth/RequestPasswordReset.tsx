import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function RequestPasswordReset() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8081/api/auth/reset-password',
                new URLSearchParams({ email })
            );
            const token = response.data.split(': ')[1];
            console.log(token);
            if (token) {
                navigate(`/resetpassword?token=${token}`);
            } else {
                alert('Failed to retrieve token');
            }
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                alert('User not found');
            } else {
                alert('An error occurred');
            }
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Reset Password</button>
        </form>
        </>
    );
}