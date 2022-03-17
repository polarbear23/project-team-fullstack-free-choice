import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { StoreContext } from '../utils/store';

import { LOCAL_STORAGE, STORE_ACTIONS } from '../config';

import './styling/header.css';

export const Header = () => {
    const { state, dispatch } = useContext(StoreContext);

    const { user } = state;

    const navigate = useNavigate();

    const handleDispatch = (type, payload) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const capitaliseFirstLetter = (string) => string.replace(/\b\w/g, (c) => c.toUpperCase());

    const handleClick = () => {
        localStorage.removeItem(LOCAL_STORAGE.TOKEN);

        handleDispatch(STORE_ACTIONS.USER, null);

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
