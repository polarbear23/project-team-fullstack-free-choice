import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './components/Homepage'
import Welcomepage from './components/Welcomepage'
import Header from './components/Header'

import './App.css';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(true)

    const findUser = () => {
        setIsLoggedIn(true)
    }

    useEffect(() => {
        findUser()
    })

    return (
        <div className="app">

            <Header isLoggedIn={isLoggedIn} />

            {!isLoggedIn && <Welcomepage />}
            {isLoggedIn &&
                <Routes>
                    <Route path="/" element={<Homepage />} />
                </Routes>
            }

        </div>
        
    );
}

export default App;