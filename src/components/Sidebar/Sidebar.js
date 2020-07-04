import React from 'react';
import { NavLink } from 'react-router-dom';

import './Sidebar.css';


const linkList = [
    { location: "account", icon: "account_tree", name: "Loans" },
    { location: "books", icon: "local_library", name: "Books" },
    { location: "movies", icon: "movie", name: "Movies" },
    { location: "music", icon: "equalizer", name: "Music" },
    { location: "games", icon: "sports_esports", name: "Games" },
    { location: "misc", icon: "miscellaneous_services", name: "Misc" }
];


const Sidebar = () => {
    return (
        <nav className="sidebar-container">
            <div className="logo">
                    Library
            </div>
            <ul className="sidebar">
                {linkList.map((link, i) => (
                    <li className="side__item" key={i}>
                        <NavLink to={link.location} className="link" activeClassName="selected">
                            <span className="material-icons side__icon">
                                    {link.icon}
                            </span> 
                            {link.name}
                        </NavLink>
                    </li>
                ))}
            </ul> 
        </nav>
    );
};

export default Sidebar;
