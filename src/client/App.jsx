import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './components/Homepage';
import { Welcome } from './components/Welcome';
import Header from './components/Header';

import './App.css';

export const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const findUser = () => {
        setIsLoggedIn(false);
    };

    useEffect(() => {
        findUser();
    });

    return (
        <div className="app">
            <Header isLoggedIn={isLoggedIn} />

            {!isLoggedIn && (
                <Routes>
                    <Route path="/" element={<Welcome />} />
                </Routes>
            )}
            {isLoggedIn && (
                <Routes>
                    <Route path="/" element={<Homepage />} />
                </Routes>
            )}
        </div>
    );
};

export default App;
