import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../App';
import { CardTag } from './card/CardTag';
import { SeasonPodium } from './card/SeasonPodium';

import { API_URL, HTTP_METHOD, LOCAL_STORAGE } from '../config';

import './styling/competition.css';

export const Competition = (props) => {
    const { competition } = props;

    const { user } = useContext(UserContext);

    const [currentSeason, setCurrentSeason] = useState([]);
    const [previousSeasons, setPreviousSeasons] = useState([]);

    const navigate = useNavigate();

    console.log('states', { currentSeason, previousSeasons });

    useEffect(() => {
        const fetchSeasons = async () => {
            const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);

            const response = await fetch(API_URL.COMPETITION_GET_BY_ID, {
                method: HTTP_METHOD.GET,
                headers: {
                    Authorization: token,
                },
            });

            const result = await response.json();

            console.log(result)

            if (result.error) {
                return;
            }

            setCurrentSeason(result.data[result.data.length - 1]);

            if (result.data.length > 1) {
                const filteredSeasons = result.data.slice(
                    0,
                    result.data.length - 1
                );

                setPreviousSeasons(filteredSeasons);
            }
        };

        fetchSeasons();
    }, [competition]);

    const handleClick = (seasonName) =>
        navigate(`/${user}/${competition.Id}/${seasonName}`);

    return (
        <div className="competition-page">
            <h1>Mario Kart</h1>
            <button onClick={() => handleClick('create')}>
                Create new season
            </button>
            {currentSeason && (
                <>
                    <h2>Current Season</h2>
                    <div className="card season-card">
                        <CardTag
                            title={'Flower Cup'}
                            handleClick={() => handleClick('flower-cup')}
                        />

                        <div className="card-display">
                            <div className="podium season-podium">
                                <h4>Position</h4>
                                <div className="podium-rounds">
                                    <div className="season-round">
                                        <h5>Round 5</h5>
                                        <h4>{`Mario Circuit`}</h4>
                                    </div>
                                </div>
                                <h4>Score</h4>
                            </div>

                            {/* This div gets mapped; participants sorted by score */}
                            <SeasonPodium />
                        </div>
                    </div>
                </>
            )}
            {previousSeasons.length > 0 && <h2>Previous Seasons</h2>}
        </div>
    );
};
