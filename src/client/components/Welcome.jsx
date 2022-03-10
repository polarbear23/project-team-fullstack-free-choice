import React from 'react';

import { useState } from 'react';

import { Login } from './Login';
import { Register } from './Register';
import { SearchLeaderboard } from './SearchLeaderboard';

import './styling/welcome.css';

export const Welcome = (props) => {
    const { setIsLoggedIn } = props;

    const [formToRender, setFormToRender] = useState('');

    const handleClick = (event) => {
        const { id } = event.target;

        setFormToRender(id);
    };

    const blurSection = () =>
        formToRender ? 'app-welcomepage-blur' : 'app-welcomepage';

    return (
        <>
            <section className={blurSection()}>
                <h1 className="welcome-heading title">
                    Create Your own Leaderboards
                </h1>
                <section className="user-buttons-grid-container">
                    <button
                        className="user-buttons user-buttons-register"
                        id="register"
                        onClick={handleClick}
                    >
                        Register
                    </button>
                    <button
                        className="user-buttons user-buttons-login"
                        id="login"
                        onClick={handleClick}
                    >
                        Login
                    </button>
                </section>
                <h2 className="welcome-heading subtitle">
                    Or view a leaderboard you have an invite to:
                </h2>
                <SearchLeaderboard />
                {formToRender === 'register' && (
                    <Register
                        setFormToRender={setFormToRender}
                        setIsLoggedIn={setIsLoggedIn}
                    />
                )}
                {formToRender === 'login' && (
                    <Login
                        setFormToRender={setFormToRender}
                        setIsLoggedIn={setIsLoggedIn}
                    />
                )}
            </section>
        </>
    );
};
