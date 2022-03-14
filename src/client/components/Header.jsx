import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '../App';

import { LOCAL_STORAGE } from '../config';

import './styling/header.css';

export const Header = () => {
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const capitaliseFirstLetter = (string) => string.replace(/\b\w/g, (c) => c.toUpperCase());

    const handleClick = () => {
        localStorage.removeItem(LOCAL_STORAGE.TOKEN);

        setUser(null);

        navigate(`/`);
    };

    return (
        <div className="app-header">
            <nav className="header-nav">
                <h1 className="header-logo">SteveNeverFirst</h1>
                {user && (
                    <>
                        <Link to={`/${user}`} className="router-link">
                            <h2 className="header-link">My Leaderboards</h2>
                        </Link>
                        <div className="header-profile">
                            <h2>Hi, {capitaliseFirstLetter(user)}</h2>
                            <button
                                className="header-logout-button"
                                onClick={handleClick}
                            >
                                Logout
                            </button>
                        </div>
                    </>
                )}
            </nav>
        </div>
    );
};
