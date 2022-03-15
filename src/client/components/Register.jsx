import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../App';

import { postFormToServer } from '../utils/auth';
import { API_URL, LOCAL_STORAGE } from '../config';

import './styling/welcome-form.css';

export const Register = (props) => {
    const { setFormToRender } = props;

    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const initialForm = {
        username: '',
        email: '',
        password: '',
    };

    const [form, setForm] = useState(initialForm);

    const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await postFormToServer(API_URL.ADMIN_REGISTER, form);

        if (!result || result.error) {
            return;
        }

        localStorage.setItem(LOCAL_STORAGE.TOKEN, result.token);

        setUser(result.data.username);

        navigate(`/${user}`);
    };

    const handleRedirect = () => setFormToRender('login');

    const handleClose = () => setFormToRender('');

    return (
        <section className="app-welcomeform">
            <section className="welcomeform-container">
                <div className="welcomeform-aside">
                    <h1>Register</h1>
                    <h2>Have an account?</h2>
                    <button
                        className="welcomeform-button welcomeform-redirect-button"
                        onClick={handleRedirect}
                    >
                        Login
                    </button>
                </div>
                <form className="welcomeform-form">
                    <div
                        className="welcomeform-close-button"
                        onClick={handleClose}
                    >
                        <h4>X</h4>
                    </div>
                    <input
                        className="welcomeform-form-input"
                        name="username"
                        type="text"
                        placeholder="Enter Username (min 3 characters)"
                        value={form.username}
                        required
                        minLength="3"
                        onChange={handleChange}
                    />
                    <input
                        className="welcomeform-form-input"
                        name="password"
                        type="password"
                        placeholder="Enter Password (min 6 characters)"
                        value={form.password}
                        required
                        minLength="6"
                        onChange={handleChange}
                    />
                    <input
                        className="welcomeform-form-input"
                        name="email"
                        type="text"
                        placeholder="Enter Email"
                        value={form.email}
                        required
                        onChange={handleChange}
                    />
                    <button
                        className="welcomeform-button welcomeform-submit-button"
                        onClick={handleSubmit}
                    >
                        Register
                    </button>
                </form>
            </section>
        </section>
    );
};
