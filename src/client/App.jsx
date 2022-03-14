import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Homepage } from './components/Homepage';
import { Welcome } from './components/Welcome';
import { Header } from './components/Header';
import { Competition } from './components/Competition';
import { Season } from './components/Season';
import { CreateSeason } from './components/CreateSeason';

import { API_URL, HTTP_METHOD, LOCAL_STORAGE } from './config';

import './App.css';

export const UserContext = createContext();

export const App = () => {
    const [user, setUser] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);

        if (!token) {
            return;
        }

        const authenticateUser = async () => {
            try {
                const response = await fetch(API_URL.GET, {
                    method: HTTP_METHOD.GET,
                    headers: {
                        Authorization: token,
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
    }, []);

    useEffect(() => {
        if (!user) {
            return;
        }

        navigate(`/${user}`);
    }, [user]);

    return (
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
            <div className="app">
                <Header />
                <Routes>
                    {!user && (
                        <>
                            <Route path="/" element={<Welcome />} />
                            <Route path="*" element={<Welcome />} />
                        </>
                    )}
                    {user && (
                        <>
                            <Route path={`/${user}`} element={<Homepage />} />
                            <Route path="/:user/:competitionId" element={<Competition />} />
                            <Route path="/:user/:competitionId/:seasonId" element={<Season />} />
                            <Route path="/:user/:competitionId/create" element={<CreateSeason user={user} />} />
                            <Route path="*" element={<Homepage />} />
                        </>
                    )}
                </Routes>
            </div>
        </UserContext.Provider>
    );
};
