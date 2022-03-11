import React, { useState } from 'react';

import { postFormToServer } from '../utils/auth';

import { API_URL } from '../config';

import './styling/register.css';

export const Register = (props) => {
    const { setIsLoggedIn, setFormToRender } = props;

    const initialForm = {
        username: '',
        email: '',
        password: '',
    };

    const [form, setForm] = useState(initialForm);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await postFormToServer(API_URL.REGISTER, form);

        if (!result.token) return;

        localStorage.setItem('token', result.token);

        setIsLoggedIn(true);
    };

    const handleRedirect = () => setFormToRender('login');

    const handleClose = () => setFormToRender('');

    return (
        <section className="app-register">
            <section className="register-container">
                <div className="register-aside">
                    <p className="register-aside-text register-aside-title">
                        Register
                    </p>
                    <p className="register-aside-text">Have an account?</p>
                    <button
                        className="register-button register-redirect-button"
                        onClick={handleRedirect}
                    >
                        Login
                    </button>
                </div>
                <form className="register-form">
                    <p className="register-close-button" onClick={handleClose}>
                        X
                    </p>
                    <input
                        className="register-form-input"
                        name="username"
                        type="text"
                        placeholder="Enter Username"
                        value={form.username}
                        required
                        onChange={handleChange}
                    />
                    <input
                        className="register-form-input"
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        value={form.password}
                        required
                        onChange={handleChange}
                    />
                    <input
                        className="register-form-input"
                        name="email"
                        type="text"
                        placeholder="Enter Email"
                        value={form.email}
                        required
                        onChange={handleChange}
                    />
                    <button
                        className="register-button register-submit-button"
                        onClick={handleSubmit}
                    >
                        Register
                    </button>
                </form>
            </section>
        </section>
    );
};
