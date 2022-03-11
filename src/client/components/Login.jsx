import React, { useState } from 'react';

import { postFormToServer } from '../utils/auth';

import './styling/login.css';

export const Login = (props) => {
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
        <section className="app-welcomeform">
            <div className="welcomeform-container">
                <div className="welcomeform-aside">
                    <h1>Login</h1>
                    <h2>Don&apos;t have an account?</h2>
                    <button
                        className="welcomeform-button welcomeform-redirect-button"
                        onClick={handleRedirect}
                    >
                        Register
                    </button>
                </div>
                <form className="welcomeform-form">
                    <p className="welcomeform-close-button" onClick={handleClose}>X</p>
                    <input
                        className="welcomeform-form-input"
                        name="username"
                        type="text"
                        placeholder="Enter Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="welcomeform-form-input"
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button
                        className="welcomeform-button welcomeform-submit-button"
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
                </form>
            </div>
        </section>
    );
};
