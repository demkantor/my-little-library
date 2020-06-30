import React from 'react';
import { NavLink } from 'react-router-dom';

import './Sidebar.css';



const Sidebar = () => {

    
    return (
        <nav className="sidebar-container">
            <div className="logo">
                    Library
            </div>
            <ul className="sidebar">
                <li className="side__item">
                    <NavLink to="/account" className="link" activeClassName="selected">
                        <span className="material-icons side__icon">
                                account_tree
                        </span> 
                        Loans
                    </NavLink>
                </li>
                <li className="side__item">
                    <NavLink to="/books" className="link" activeClassName="selected">
                        <span className="material-icons side__icon">
                                local_library
                        </span> 
                        Books
                    </NavLink>
                </li>
                <li className="side__item">
                    <NavLink to="/movies" className="link" activeClassName="selected">
                        <span className="material-icons side__icon">
                                movie
                        </span> 
                        Movies
                    </NavLink>
                </li>
                <li className="side__item">
                    <NavLink to="/music" className="link" activeClassName="selected">
                        <span className="material-icons side__icon">
                                equalizer
                        </span> 
                        Music
                    </NavLink>
                </li>
                <li className="side__item">
                    <NavLink to="/misc" className="link" activeClassName="selected">
                        <span className="material-icons side__icon">
                                miscellaneous_services
                        </span> 
                        Misc
                    </NavLink>
                </li>
            </ul> 
        </nav>
    )
};

export default Sidebar;
