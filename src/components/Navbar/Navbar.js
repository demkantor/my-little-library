import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './Navbar.css';


const Navbar = ({ handleExpand }) => {
    const dispatch = useDispatch();

    const [openSidebar, setOpenSidebar] = useState(true);
    const [expandMenu, setExpandMenu] = useState(false); 

    const toggleOpen = () => setOpenSidebar(!openSidebar);
    const toggleMenu = () => setExpandMenu(!expandMenu);

    return (
        <nav className="navbar-container">
            <ul className={openSidebar ? "navbar" : "navbar expanded"}>
                <li className="nav__item">
                    <button className="nav__btn" onClick={()=>{toggleOpen(); handleExpand()}}>
                        {openSidebar
                        ?
                        <span className="material-icons">
                            menu_open
                        </span> 
                        :
                        <span className="material-icons">
                            menu
                        </span> 
                        }
                    </button>
                </li>
                <li className={expandMenu ? 'nav__item menu -active' : 'nav__item menu'} onClick={toggleMenu}>
                    {/* <img src="" alt="" className="nav_pic" /> */}
                    <span className="material-icons">
                        face
                    </span> 
                    <span>Profile Name</span>
                    <span className="material-icons">expand_more</span>
                    <ul className="menu__list">
                        <Link to="/profile" className="menu__item">
                            <span className="material-icons menu__icon">
                                person
                            </span> 
                            Profile
                        </Link>
                        <Link to="/login" className="menu__item" onClick={()=>dispatch({ type: 'LOGOUT'})}>
                            <span className="material-icons menu__icon">
                                login
                            </span> 
                            Log Out
                        </Link>
                    </ul> 
                </li>
            </ul>
        </nav>
    )
};

export default Navbar;
