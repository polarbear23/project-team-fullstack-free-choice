import React from 'react';
import { Link } from 'react-router-dom';

import './styling/header.css';

function Header() {

    return (
        <div className="app-header">
            <nav className="header-nav">
                <h1 className="header-logo">SteveNeverFirst</h1>
                <Link to="/" className="router-link">
                    <h2 className="header-link">My Leaderboards</h2>
                </Link>
                <div className="header-profile"><h2>Hi, Steve!</h2></div>
            </nav>
        </div>
    )
}

export default Header