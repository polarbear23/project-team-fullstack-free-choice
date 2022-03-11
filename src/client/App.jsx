import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Homepage } from './components/Homepage';
import { Welcome } from './components/Welcome';
import { Header } from './components/Header';

import { Competition } from './components/Competition';
import { Season } from './components/Season';

import Competitors from './components/Competitors';
import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState("nathan");

    const findUser = () => {
        setIsLoggedIn(true);
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
            <Header
                isLoggedIn={isLoggedIn}
                user={user}
                setUser={setUser}
            />


            <Routes>
                {!isLoggedIn &&
                    <Route path="/"
                    element={<Competitors user={user}/>}
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
                    <Route path="/:user/:competitorId"
                    />
                </>}
            </Routes>
        </div>
    );
};

export default App;
