import React, { useState, useEffect } from 'react';
import { IoMenu } from "react-icons/io5";
import { Link, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { NavbarData } from './NavbarData';
import { jwtDecode } from 'jwt-decode';
import './Navbar.css';
import Logo from '../assets/Bunchful_Logo.png';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Customer from '../pages/Customer';
import Order from '../pages/Order';
import Resourcehub from '../pages/Resourcehub';
import Salestraining from '../pages/Salestraining';
import Competitor from '../pages/Competitor';
import Messages from '../pages/Messages';
import Sharedfiles from '../pages/Sharedfiles';
import Salesscript from '../pages/Salesscript';
import Mailwizz from '../pages/Mailwizz';
import Settings from '../pages/Settings';

function Navbar() {
    const [userDetails, setUserDetails] = useState({});
    const [sidebar, setSidebar] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://localhost:4000';

    const showSidebar = () => setSidebar(!sidebar);

    const handleLogin = () => {
        setIsAuthenticated(true);
        navigate('/home');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserDetails({});
        localStorage.removeItem('token');
        navigate('/');
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setIsAuthenticated(true);
                setUserDetails({
                    firstName: decodedUser.firstName,
                    lastName: decodedUser.lastName,
                    email: decodedUser.email,
                    role: decodedUser.role,
                    goal: decodedUser.goal,
                    picture: decodedUser.picture || "https://via.placeholder.com/100",
                });
            } catch (error) {
                console.error("Invalid token:", error);
                setIsAuthenticated(false);
            }
        }
    }, []);

    // Check Microsoft connection and fetch user details
    useEffect(() => {
        const checkMicrosoftConnection = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/users/check-connection`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                if (!response.ok) throw new Error("Failed to check Microsoft connection.");
                const data = await response.json();

                if (data.connected) {
                    // Fetch user details after connection
                    const userResponse = await fetch(`${API_BASE_URL}/users/details`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    });
                    if (!userResponse.ok) throw new Error("Failed to fetch user details.");
                    const userData = await userResponse.json();
                    setUserDetails(userData);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error checking Microsoft connection:", error);
            }
        };

        checkMicrosoftConnection();
    }, [API_BASE_URL]);

    return (
        <>
            {isAuthenticated ? (
                <>
                    <div className={sidebar ? 'navbar-shifted' : 'navbar'}>
                        <IoMenu className='sidebar-toggler' onClick={showSidebar} />
                        <p className='title'>
                            <span className='user-name'>Hello {userDetails.firstName}!</span>
                            <br />
                            <span className='welcome'>Welcome back to Bunchful Sales Portal.</span>
                        </p>
                    </div>

                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items' onClick={showSidebar}>
                            <li className='navbar-toggle'>
                                <img className='bunchful-logo' alt="Bunchful logo" src={Logo} />
                            </li>
                            {NavbarData.map((item, index) => (
                                item.path === '/logout' ? (
                                    <li key={index} className={item.cName} onClick={handleLogout}>
                                        <Link to='/'>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                ) : (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            ))}

                            <li className="user-profile">
                                <img
                                    className="user-pic"
                                    src={userDetails.picture}
                                    alt="User Profile"
                                />
                                <span className='user-details'>
                                    <span className="user-name">{userDetails.firstName} {userDetails.lastName}</span>
                                    <span className="user-email">{userDetails.email}</span>
                                </span>
                            </li>
                        </ul>
                    </nav>

                    <div className={sidebar ? 'main-content-shifted' : 'main-content'}>
                        <Routes>
                            <Route path="/" element={<Navigate to="/home" />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/customer" element={<Customer />} />
                            <Route path="/order" element={<Order />} />
                            <Route path="/resourcehub" element={<Resourcehub />} />
                            <Route path="/salestraining" element={<Salestraining />} />
                            <Route path="/competitor" element={<Competitor />} />
                            <Route path="/messages" element={<Messages />} />
                            <Route path="/sharedfiles" element={<Sharedfiles />} />
                            <Route path="/salesscriptlibrary" element={<Salesscript />} />
                            <Route path="/mailwizz" element={<Mailwizz />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    </div>
                </>
            ) : (
                <Routes>
                    <Route path="/" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            )}
        </>
    );
}

export default Navbar;