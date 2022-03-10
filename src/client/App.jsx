import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './components/Homepage';
import { Welcome } from './components/Welcome';
import Header from './components/Header';

import './App.css';

export const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState(null);

    const findUser = () => {
        setIsLoggedIn(false);
    };

    useEffect(() => {
        findUser();
    });

    useEffect(() => {
        //get token from local storage
        //decode token, get id
        //fetch user then setUser
        
    },[isLoggedIn]);

    return (
        <div className="app">
            <Header isLoggedIn={isLoggedIn} user={user} setUser={setUser}/>

            {!isLoggedIn && (
                <Routes>
                    <Route path="/" element={<Welcome setIsLoggedIn={setIsLoggedIn}/>} />
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
