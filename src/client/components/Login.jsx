import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { postFormToServer } from '../utils/auth'
import { StoreContext } from '../utils/store';
import { API_URL, LOCAL_STORAGE, STORE_ACTIONS } from '../config';

import './styling/welcome-form.css';

export const Login = (props) => {
    const { setFormToRender } = props;

    const { state, dispatch } = useContext(StoreContext);

    const { user } = state;

    const handleDispatch = (type, payload) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const navigate = useNavigate();

    const initialForm = {
        username: '',
        password: '',
    };

    const [form, setForm] = useState(initialForm);

    const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await postFormToServer(API_URL.ADMIN_LOGIN, form);

        if (!result || result.error) {
            return;
        }

        localStorage.setItem(LOCAL_STORAGE.TOKEN, result.token);

        handleDispatch(STORE_ACTIONS.USER, result.data.username);

        navigate(`/${user}`);
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
                        placeholder="Enter Username"
                        value={form.username}
                        onChange={handleChange}
                        minLength="3"
                        required
                    />
                    <input
                        className="welcomeform-form-input"
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        value={form.password}
                        onChange={handleChange}
                        minLength="6"
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
