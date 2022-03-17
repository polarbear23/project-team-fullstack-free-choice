import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { CompetitionCard } from './CompetitionCard';

import { API_URL, HTTP_METHOD, LOCAL_STORAGE, STORE_ACTIONS } from '../config';
import { StoreContext } from '../utils/store';

import './styling/homepage.css';

export const Homepage = () => {
    const { state, dispatch } = useContext(StoreContext);

    const { competitions } = state;

    const handleDispatch = (type, payload) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    useEffect(() => {
        const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);

        const getCompetitions = async () => {
            const response = await fetch(API_URL.COMPETITION_GET, {
                method: HTTP_METHOD.GET,
                headers: {
                    Authorization: token,
                },
            });
            const results = await response.json();

            handleDispatch(STORE_ACTIONS.COMPETITIONS, results.data);
        };

        getCompetitions();
    }, []);

    return (
        <main className="app-homepage">
            <Link to="/create">
                <button className="create-competition-button">
                    Create Competition
                </button>
            </Link>

            <div className="competition-display">
                {competitions &&
                    competitions.map((competition, index) => {
                        return (
                            <CompetitionCard
                                key={index}
                                competition={competition}
                            />
                        );
                    })}
            </div>
        </main>
    );
};
