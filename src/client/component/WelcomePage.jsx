import React from 'react';

import { useState } from 'react';

import Login from './Login';
import Register from './Register';
//import SearchLeaderboard from './SearchLeaderboard';

import './welcomepage.css'

const WelcomePage = () => {
    //const { isLoggedIn } = props;

    const [formToRender, setFormToRender] = useState('');

    const handleClick = (event) => {
        const { id } = event.target;

        setFormToRender(id);
    };

    return (
        <>
            <section className="app-welcomepage">
                <h1>Create Your own Leaderboards</h1>
                <section className="user-buttons-grid-container">
                    <button className="user-buttons user-buttons-register" id="register" onClick={handleClick}>
                        Register
                    </button>
                    <p>/</p>
                    <button className="user-buttons user-buttons-register" id="login" onClick={handleClick}>
                        Login
                    </button>
                </section>
                <h2>Or view a leaderboard you have an invite to:</h2>

            </section>
            {formToRender === 'register' && <Register />}
            {formToRender === 'login' && <Login />}
        </>
    );
};

export default WelcomePage;
