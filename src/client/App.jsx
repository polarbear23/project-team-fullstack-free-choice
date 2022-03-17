import React, { useEffect, useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Homepage } from './components/Homepage';
import { Welcome } from './components/Welcome';
import { Header } from './components/Header';
import { Competition } from './components/Competition';
import { Season } from './components/Season';
import { CreateSeason } from './components/CreateSeason';
import { Competitors } from './components/Competitors';
import Rounds from './components/Rounds';

import { API_URL, HTTP_METHOD, LOCAL_STORAGE, STORE_ACTIONS } from './config';
import { StoreContext, reducer, initialState } from './utils/store';

import './App.css';

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { user } = state;

    const navigate = useNavigate();

    const handleDispatch = (type, payload) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    useEffect(() => {
        const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);

        if (!token) {
            return;
        }

        const fetchUserFromToken = async () => {
            try {
                const response = await fetch(API_URL.ADMIN_GET, {
                    method: HTTP_METHOD.GET,
                    headers: {
                        Authorization: token,
                    },
                });

                const result = await response.json();

                const { username } = result.data;

                if (result) {
                    handleDispatch(STORE_ACTIONS.USER, username);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserFromToken();
    }, []);

    useEffect(() => {
        if (!user) {
            return;
        }

        navigate(`/${user}`);
    }, [user]);

    return (
        <StoreContext.Provider value={{ state: state, dispatch: dispatch }}>
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
                            <Route
                                path="/:user/:competitionId"
                                element={<Competition />}
                            />
                            <Route
                                path="/:user/:competitionId/:seasonId"
                                element={<Season />}
                            />
                            <Route
                                path="/:user/:competitionId/create"
                                element={<CreateSeason />}
                            />
                            <Route path="*" element={<Homepage />} />
                            <Route path="/create" element={<Rounds />} />
                        </>
                    )}
                </Routes>
            </div>
        </StoreContext.Provider>
    );
};
