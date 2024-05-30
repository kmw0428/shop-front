import React, { useState } from 'react';
import './Login.css'; // CSS 파일을 import

interface LoginFormProps {
    // 필요한 경우 props를 정의할 수 있습니다.
}

const Login: React.FC<LoginFormProps> = () => {
    const [showSignIn, setShowSignIn] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 로그인 기능 구현
    };

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 회원가입 기능 구현
    };

    return (
        <div className="login-page">
            <div className={`login-content login-content-signin ${showSignIn ? '' : 'ng-hide'}`}>
                <div>
                    <img src="/logo.png" alt='logo' className='imgstyle'></img>
                    <br></br><br></br><br></br>
                    <h2>Login</h2>
                    <form className="wrapper-box" role="form" onSubmit={handleLogin}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control form-control-email"
                            placeholder="Email address"
                            required
                        /><br></br>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control form-control-password"
                            placeholder="Password"
                            required
                        />
                        <a className="outer-link pull-left" href="#/forgot">Forgot Password</a>
                        <button type="submit" className="btn btn-submit btn-default pull-right" style={{ marginTop: 30 }}>Log in</button>
                    </form>
                </div>
            </div>

            <div className={`login-content login-content-signup ${showSignIn ? 'ng-hide' : ''}`}>
                <div>
                    <img src="/logo.png" alt='logo' className='imgstyle'></img>
                    <br></br><br></br><br></br>
                    <h2>Sign Up</h2>
                    <form className="wrapper-box" role="form" onSubmit={handleRegister}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control form-control-username"
                            placeholder="Username"
                            required
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control form-control-email"
                            placeholder="Email address"
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control form-control-password"
                            placeholder="Password"
                            required
                        /><br></br><br></br>
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
