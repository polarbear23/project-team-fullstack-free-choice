import React from 'react';

import { useState } from 'react';

const Login = () => {
    const intitalForm = {
        username: '',
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

    const handleSubmit = () => {
        // POST form to server
        // response contains token
        // save token to localStorage
        //
    };

    return (
        <section className="app-login">
            <form className="login-form">
                <input
                    name="username"
                    type="text"
                    placeholder="Enter Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button onClick={handleSubmit}>Login</button>
            </form>
        </section>
    );
};

export default Login;
