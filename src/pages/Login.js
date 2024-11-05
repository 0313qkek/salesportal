import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Logo from '../assets/Bunchful_Logo.png';
import { IoEye, IoEyeOff } from "react-icons/io5";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='login-container'>
            <div className='login-left'>
                <img className='login-logo' alt="Bunchful logo" src={Logo} />
                <h2>Welcome back</h2>
                <p>Sign in to Bunchful Sales Portal</p>
            </div>
            <div className='login-right'>
                <form className='login-form'>
                    <h3>Pleace enter your login details</h3>
                    <label>Email Address</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='Emal Address'
                    />
                    <label>Password</label>
                    <div className='password-field'>
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Password'
                        />
                        {showPassword ? (
                            <IoEyeOff className='show-password-icon' onClick={() => setShowPassword(!showPassword)} />
                        ) : (
                            <IoEye className='show-password-icon' onClick={() => setShowPassword(!showPassword)} />
                        )}
                    </div>
                    <p className='forgot-password'>Forgot your password?</p>
                    <button type='submit' className='login-button'>Sign In</button>
                    <p className='terms'>
                        By continuing, you agree to the Bunchful <a href="#">terms of service</a> and <a href="#">privacy notice</a>.
                    </p>
                    <p className='register-link'>
                        Don't have an account? <Link to="/register" className="register-button">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;