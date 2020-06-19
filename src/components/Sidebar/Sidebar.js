import React from 'react';
import { NavLink } from 'react-router-dom';

import './Sidebar.model.css';



const Sidebar = () => {

    
    return (
        <nav className="sidebar-container">
            <div className="logo">
                    Sidebar
            </div>
            <ul className="sidebar">
                <li className="side__item">
                    <NavLink to="/profile">
                        Account
                    </NavLink>
                </li>
                <li className="side__item">
                    <NavLink to="/profile">
                        Books
                    </NavLink>
                </li>
                <li className="side__item">
                    <NavLink to="/profile">
                        Movies
                    </NavLink>
                </li>
                <li className="side__item">
                    <NavLink to="/profile">
                        Misc
                    </NavLink>
                </li>
            </ul> 
        </nav>
    )
};

export default Sidebar;
