import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const navigate = useNavigate();

    const handleBackToSignIn = () => {
        navigate('/Login');
    };

    return (
        <div className='register-container'>
            <h2>Register</h2>
            <form className='register-form'>
                <div className='section'>
                    <h3>Your Profile</h3>
                    <p>Choose how you are displayed</p>
                    <label>Name</label>
                    <input 
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className='section'>
                    <h3>Email and Phone Number</h3>
                    <p>Enter the email and phone number you want to use for signing in.</p>
                    <label>Email</label>
                    <input 
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Phone Number</label>
                    <input
                        type='text'
                        value={phone}  
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <div className='section'>
                    <h3>Password</h3>
                    <p>Create a strong password for your account.</p>
                    <label>Password</label>
                    <input 
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>Confirm Password</label>
                    <input 
                        type='password'
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                </div>

                <div className='button-group'>
                    <button type='submit' className='save-button'>Register</button>
                    <button type='button' className='back-button' onClick={handleBackToSignIn}>Return to Sign-In</button>
                </div>
            </form>
        </div>
    );
}

export default Register;