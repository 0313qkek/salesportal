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
    const [sidebar, setSidebar] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    const showSidebar = () => setSidebar(!sidebar);

    const handleLogin = () => {
        setIsAuthenticated(true);
        navigate('/home');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserName('');
        setUserEmail('');
        localStorage.removeItem('token');
        navigate('/');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserName(decoded.name);
                setUserEmail(decoded.email);
                setIsAuthenticated(true);
            } catch (err) {
                setIsAuthenticated(false);
            }
        }
    }, [isAuthenticated]);

    return (
        <>
            {isAuthenticated ? (
                <>
                    <div className={sidebar ? 'navbar-shifted' : 'navbar'}>
                        <IoMenu className='sidebar-toggler' onClick={showSidebar} />
                        <p className='title'>
                            <span className='user-name'>Hello {userName}!</span>
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
                                    src="https://via.placeholder.com/40"
                                    alt="User Profile"
                                />
                                <span className='user-details'>
                                    <span className="user-name">{userName}</span>
                                    <span className="user-email">{userEmail}</span>
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