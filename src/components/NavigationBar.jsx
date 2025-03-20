import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <nav className="navigation">
            <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                end
            >
                Home
            </NavLink>
            <NavLink 
                to="/characters" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
                Characters
            </NavLink>
            <NavLink 
                to="/comics" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
                Comics
            </NavLink>
        </nav>
    );
};

export default NavigationBar;