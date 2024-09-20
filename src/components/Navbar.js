import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { Link, Route, Routes } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import Home from '../pages/Home';

function Navbar() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
            <IconContext.Provider value={{ color: '#000' }}>
                {/* Top Bar with Menu Icon */}
                <div className={sidebar? 'navbar-shifted' :'navbar'}>
                    <Link to="#" className='menu-bars'>
                        <IoMenu onClick={showSidebar} />
                    </Link>
                    <p className='title'>
                        <span className='user-name'>Hello Thomas!</span>
                        <br />
                        <span className='welcome'>Welcome back to Bunchful Sales Portal.</span>
                    </p>
                </div>

                {/* Sidebar Navigation */}
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <img className='bunchful-logo' alt="Bunchful logo" src="https://cdn.animaapp.com/projects/66df96716380b9e298843353/releases/66df9697be8a5232fb402cc6/img/bunchful-logo.png"/>
                        </li>
                        {SidebarData.map((item, index) => {
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
                        <Route path='/' element={<Home />}/>
                    </Routes>
                </div>
            </IconContext.Provider>
        </>
    )
}

export default Navbar