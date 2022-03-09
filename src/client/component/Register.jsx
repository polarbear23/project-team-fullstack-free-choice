import React from 'react';

import { useState } from 'react';

import './register.css';

const Register = () => {
    const intitalForm = {
        username: '',
        email: '',
        password: '',
    };

    const [form, setForm] = useState(intitalForm);

    console.log('states', {
        form,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
        // POST form to server
        // response contains token
        // save token to localStorage
        // set isLoggedIn to trigger useEffect in parent

        const headers = {
            'Content-Type': 'application/json',
        }

        postFormToServer('http://localhost:4000/user/register', 'POST', headers, form);

    };

    const postFormToServer = async (url, method, headers, reqBody) => {
        const response = await fetch(url, fetchConfig(method, headers, reqBody))

        const data = await response.json();

        localStorage.setItem('token', data.token); //asummes token is property within data
    }

    const fetchConfig = (method, headers, reqBody) => {
        return {
            method,
            headers,
            body: JSON.stringify(reqBody),
        }
    }

    return (
        <section className="register-form-container">
            <p className="login-section-title">Login</p>
            <form className="register-form">
                <input
                    name="username"
                    type="text"
                    placeholder="Enter Username"
                    value={form.username}
                    required
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    value={form.password}
                    required
                    onChange={handleChange}
                />
                <input
                    name="email"
                    type="text"
                    placeholder="Enter Email"
                    value={form.email}
                    required
                    onChange={handleChange}
                />
                <button className="register-submit-button" onClick={handleSubmit}>Register</button>
            </form>
        </section>
    );
};

export default Register;
