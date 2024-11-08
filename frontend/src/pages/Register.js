import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('user');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const navigate = useNavigate();

    const handleBackToSignIn = () => {
        navigate('/');
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, phone, role, password, password2 }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || "Registration successful!");
                navigate('/');
            } else {
                alert(data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className='register-container'>
            <h2>Register</h2>
            <form onSubmit={handleRegister} className='register-form'>
                <div className='section'>
                    <h3>Your Profile</h3>
                    <p>Choose how you are displayed</p>
                    <label>First Name</label>
                    <input
                        type='text'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <label>Last Name</label>
                    <input
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <label>Role</label>
                    <select
                        value={role}
                        onChange={(e) => {
                            setRole(e.target.value);
                        }}
                        required
                    >
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                        <option value="guest">Guest</option>
                    </select>
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