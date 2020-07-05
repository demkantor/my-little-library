import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './RouteMap.css';

const RouteMap = () => {

    // todo
    // set up breadcrumb routing app.js level then add here

    const [routes, setRoutes] = useState(['Books', 'New']);

    const currentRoute = () => {
        setRoutes([ ...routes, 'More' ])
    }
    

    return (
        <div className="route-mapper">
            <div className="routes">
                <h1 className="route-item">
                    <NavLink exact to="/">
                        <button className="route-link">
                            Home
                        </button>
                    </NavLink>
                </h1>
                {routes.map((route, i) => (
                    <h1 className="route-item" key={i}>
                        <span className="material-icons arrow">
                            keyboard_arrow_right
                        </span> 
                        <NavLink exact to={route.toLowerCase()}>
                            <button className="route-link" onClick={currentRoute}>
                                {route}
                            </button>
                        </NavLink>
                    </h1>
                ))}
            </div>
        </div>
    );
};

export default RouteMap;
