import React from 'react';
import { Link } from 'react-router-dom';

import './styling/header.css';

export const Header = (props) => {
    const { isLoggedIn, user, setIsLoggedIn, setUser } = props;

    const handleClick = () => {
        localStorage.removeItem('token');

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
                {isLoggedIn && (
                    <div className="header-profile">
                        <h2>Hi, {user}</h2>
                        <button onClick={handleClick}>logout</button>
                    </div>
                )}
            </nav>
        </div>
    );
};
