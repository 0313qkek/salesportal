import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { Link, Route, Routes } from 'react-router-dom';
import { NavbarData } from './NavbarData';
import './Navbar.css';
import Logo from '../assets/Bunchful_Logo.png';
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
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
            <div className={sidebar ? 'navbar-shifted' : 'navbar'}>
                <IoMenu className='sidebar-toggler' onClick={showSidebar} />
                <p className='title'>
                    <span className='user-name'>Hello Thomas!</span>
                    <br />
                    <span className='welcome'>Welcome back to Bunchful Sales Portal.</span>
                </p>
            </div>

            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <img className='bunchful-logo' alt="Bunchful logo" src={Logo} />
                    </li>
                    {NavbarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}

                    <li className="user-profile">
                        <img
                            className="user-pic"
                            src="https://via.placeholder.com/40"
                            alt="User Profile"
                        />
                        <span className='user-details'>
                            <span className="user-name">Thomas Laub</span>
                            <span className="user-email">tlaub@bunchful.com</span>
                        </span>
                    </li>
                </ul>
            </nav>
            <div className={sidebar ? 'main-content-shifted' : 'main-content'}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/Customer' element={<Customer />} />
                    <Route path='/Order' element={<Order />} />
                    <Route path='/Resourcehub' element={<Resourcehub />} />
                    <Route path='/Salestraining' element={<Salestraining />} />
                    <Route path='/Competitor' element={<Competitor />} />
                    <Route path='/Messages' element={<Messages />} />
                    <Route path='/Sharedfiles' element={<Sharedfiles />} />
                    <Route path='/Salesscriptlibrary' element={<Salesscript />} />
                    <Route path='/Mailwizz' element={<Mailwizz />} />
                    <Route path='/Settings' element={<Settings />} />
                </Routes>
            </div>
        </>
    )
}

export default Navbar