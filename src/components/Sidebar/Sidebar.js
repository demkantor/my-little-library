import React from 'react';
import { NavLink } from 'react-router-dom';

import './Sidebar.model.css';



const Sidebar = () => {

    


    return (
        <nav className="sidebar">
            sidebar
                <NavLink to="/profile">
                    Account
                </NavLink>
                <NavLink to="/profile">
                    Books
                </NavLink>
                <NavLink to="/profile">
                    Movies
                </NavLink>
                <NavLink to="/profile">
                    Misc
                </NavLink>
        </nav>
    )
};

export default Sidebar;
