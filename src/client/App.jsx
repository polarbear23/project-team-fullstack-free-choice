import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Homepage } from './components/Homepage';
import { Welcome } from './components/Welcome';
import { Header } from './components/Header';
import { Competition } from './components/Competition';
import { Season } from './components/Season';

import { API_URL, HTTP_METHOD, LOCAL_STORAGE } from './config';

import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem(LOCAL_STORAGE.TOKEN)) setIsLoggedIn(true)
    }, []);

    useEffect(() => {
        if (!isLoggedIn) return;

        const authenticateUser = async () => {
            try {
                const response = await fetch(API_URL.GET, {
                    method: HTTP_METHOD.GET,
                    headers: {
                        Authorization: localStorage.getItem(LOCAL_STORAGE.TOKEN),
                    },
                });

                const result = await response.json();

                if (result) {
                    setUser(result.data.username);
                }
            } catch (error) {
                console.log(error);
            }
        };

        authenticateUser();
    }, [isLoggedIn]);

    useEffect(() => {
        if(!user) return
        navigate(`/${user}`);
    }, [user]);

    return (
        <div className="app">
            <Header
                isLoggedIn={isLoggedIn}
                user={user}
                setUser={setUser}
                setIsLoggedIn={setIsLoggedIn}
            />
            <Routes>
                {!isLoggedIn && (
                    <>
                        <Route
                            path="/"
                            element={<Welcome setIsLoggedIn={setIsLoggedIn} />}
                        />
                        <Route
                            path="*"
                            element={<Welcome setIsLoggedIn={setIsLoggedIn} />}
                        />
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <Route
                            path={`/${user}`}
                            element={<Homepage user={user} />}
                        />
                        <Route
                            path="/:user/:competitionId"
                            element={<Competition user={user} />}
                        />
                        <Route
                            path="/:user/:competitionId/:seasonId"
                            element={<Season user={user} />}
                        />
                    </>
                )}
            </Routes>
        </div>
    );
};

export default App;
