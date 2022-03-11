import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";

//import { postFormToServer } from '../utils/auth';

import './styling/search-leaderboard.css';

export const SearchLeaderboard = () => {
    const [form, setForm] = useState('');

    //const navigate = useNavigate();

    const handleChange = (event) => {
        const { value } = event.target;

        setForm(...form, value);
    };

    const handleSubmit = async () => {
        //const result = await postFormToServer();
        //setState result.leaderbaord
        //redirect to leaderboard
    };

    return (
        <form className="search-leaderboard-form" onSubmit={handleSubmit}>
            <input
                className="search-leaderboard-form-input"
                name="username"
                type="text"
                placeholder="Search for a leaderboard..."
                value={form.username}
                required
                onChange={handleChange}
            />
        </form>
    );
};
