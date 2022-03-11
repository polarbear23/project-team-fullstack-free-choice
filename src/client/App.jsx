import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Homepage } from './components/Homepage';
import { Welcome } from './components/Welcome';
import { Header } from './components/Header';

import { Competition } from './components/Competition';
import { Season } from './components/Season';

import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        localStorage.getItem('token') ? setIsLoggedIn(true) : setIsLoggedIn(false);
    }, []);


    useEffect(() => {        
        if (!isLoggedIn) return;

        const authenticateUser = async () => {
            try {
                const response = await fetch('http://localhost:4000/admin/get/', {
                    method: 'GET',
                    headers: { 
                        Authorization: localStorage.getItem('token')
                    }
                })

                const result = await response.json();

                setUser(result.user)
            } catch (error) {
                console.log('error')
            }
        }

        authenticateUser()
    },[isLoggedIn]);

    return (
        <div className="app">
            <Header
                isLoggedIn={isLoggedIn}
                user={user}
                setUser={setUser}
            />


            <Routes>
                {!isLoggedIn &&
                    <Route path="/"
                        element={<Welcome setIsLoggedIn={setIsLoggedIn}/>}
                    />
                }
                {isLoggedIn && <>
                    <Route path="/:user"
                        element={<Homepage user={user}/>}
                    />
                    <Route path="/:user/:competitionId"
                        element={<Competition user={user}/>}
                    />
                    <Route path="/:user/:competitionId/:seasonId"
                        element={<Season user={user}/>}
                    />
                </>}
            </Routes>
        </div>
    );
};

export default App;
