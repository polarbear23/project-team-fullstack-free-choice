import React, { useState } from 'react';

import { postFormToServer } from '../utils/auth';

import './styling/login.css';

export const Login = (props) => {
    // eslint-disable-next-line react/prop-types
    const { setIsLoggedIn, setFormToRender } = props;

    const initialForm = {
        username: '',
        password: '',
    };

    const [form, setForm] = useState(initialForm);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await postFormToServer('url');

        localStorage.setItem('token', result.token);

        setIsLoggedIn(true);
    };

    const handleRedirect = () => setFormToRender('register');

    const handleClose = () => setFormToRender('');

    return (
        <section className="app-login">
            <div className="login-container">
                <div className="login-aside">
                    <p className="login-aside-text login-aside-title">Login</p>
                    <p className="login-aside-text">Don&apos;t have an account?</p>
                    <button
                        className="login-button login-redirect-button"
                        onClick={handleRedirect}
                    >
                        Register
                    </button>
                </div>
                <form className="login-form">
                    <p className="login-close-button" onClick={handleClose}>X</p>
                    <input
                        className="login-form-input"
                        name="username"
                        type="text"
                        placeholder="Enter Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="login-form-input"
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button
                        className="login-button login-submit-button"
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
                </form>
            </div>
        </section>
    );
};
