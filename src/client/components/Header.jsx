import React from 'react';
import { Link } from 'react-router-dom';

import { LOCAL_STORAGE } from '../config';

import './styling/header.css';

export const Header = (props) => {
    const { isLoggedIn, user, setIsLoggedIn, setUser } = props;

    const capitaliseFirstLetter = (string) => string.replace(/\b\w/g, (c) => c.toUpperCase());

    const handleClick = () => {
        localStorage.removeItem(LOCAL_STORAGE.TOKEN);

        setIsLoggedIn(false);

        setUser(null);
    };
    
    return (
        <div className="app-header">
            <nav className="header-nav">
                <h1 className="header-logo">SteveNeverFirst</h1>
                <Link to={`/${user}`} className="router-link">
                    <h2 className="header-link">My Leaderboards</h2>
                </Link>
                {isLoggedIn && user && (
                    <div className="header-profile">
                        <h2>Hi, {capitaliseFirstLetter(user)}</h2>
                        <button className="header-logout-button" onClick={handleClick}>Logout</button>
                    </div>
                )}
            </nav>
        </div>
    );
};
