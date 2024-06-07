import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // CSS 파일을 import
import { useAuth } from '../AuthProvider';

interface LoginFormProps {
    // 필요한 경우 props를 정의할 수 있습니다.
}

const Login: React.FC<LoginFormProps> = () => {
    const [showSignIn, setShowSignIn] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });

            console.log('Server response:', response.data);  // 서버 응답 로그

            if (response.data && response.data.accessToken) {
                alert('로그인 성공!');
                localStorage.setItem('token', response.data.accessToken);  // JWT 액세스 토큰을 로컬 스토리지에 저장
                localStorage.setItem('userId', response.data.userId);
                console.log('Token stored:', response.data.accessToken);  // 저장된 토큰 로그
                navigate("/mypage");
                window.location.reload();  // 페이지 새로고침
            } else {
                alert('로그인 실패: 서버에서 유효한 토큰을 받지 못했습니다.');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                alert('로그인 실패: ' + error.response.data.message);
            } else {
                alert('로그인 중 오류가 발생했습니다.');
                console.error('로그인 오류:', error);
            }
        }
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                username,
                email,
                password,                
            });
            alert('회원가입 성공!');
            login(response.data.token);
            navigate("/");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                alert('회원가입 실패: ' + error.response.data.message);
            } else {
                alert('회원가입 중 오류가 발생했습니다.');
                console.error('회원가입 오류:', error);
            }
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-page">
            <div className={`login-content login-content-signin ${showSignIn ? '' : 'ng-hide'}`}>
                <div>
                    <img src="/logo.png" alt='logo' className='imgstyle'></img>
                    <br></br><br></br><br></br>
                    <h2 className='h2styled'>Login</h2>
                    <form className="wrapper-box" role="form" onSubmit={handleLogin}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control form-control-username"
                            placeholder="Username"
                            required
                        /><br></br>
                        <div className='pwcontain'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control form-control-password"
                                placeholder="Password"
                                required
                            />
                            {password && (
                                <button type="button" className='passwordbtn' onClick={toggleShowPassword}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            )}
                        </div>
                        <a className="outer-link pull-left" href="#/forgot">Forgot Password</a>
                        <button type="submit" className="btn btn-submit btn-default pull-right" style={{ marginTop: 30 }}>Log in</button>
                    </form>
                </div>
            </div>

            <div className={`login-content login-content-signup ${showSignIn ? 'ng-hide' : ''}`}>
                <div>
                    <img src="/logo.png" alt='logo' className='imgstyle'></img>
                    <br /><br /><br />
                    <h2 className='h2styled'>Sign Up</h2>
                    <form className="wrapper-box" role="form" onSubmit={handleRegister}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control form-control-username"
                            placeholder="Id"
                            required
                        />
                        <div className='pwcontain'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control form-control-password"
                                placeholder="Password"
                                required
                            />
                            {password && (
                                <button type="button" className='passwordbtn' onClick={toggleShowPassword}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            )}
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control form-control-email"
                            placeholder="Email address"
                            required
                        />
                        <br /><br />
                        <button type="submit" className="btn btn-submit btn-default pull-right">Sign up</button>
                    </form>
                </div>
            </div>

            <div className="login-switcher">
                <div className="login-switcher-signin" style={{ display: showSignIn ? 'block' : 'none' }}>
                    <h3 style={{ marginRight: 30 }}>Don't have an account?</h3>
                    <button className="btn" onClick={() => setShowSignIn(false)} style={{ marginLeft: 40 }}>Sign Up</button>
                </div>
                <div className="login-switcher-signup" style={{ display: showSignIn ? 'none' : 'block' }}>
                    <h3 style={{ marginLeft: 45 }}>Have an account?</h3>
                    <button className="btn" onClick={() => setShowSignIn(true)}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
