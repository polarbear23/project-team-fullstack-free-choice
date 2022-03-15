import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CardTag } from './card/CardTag';
import { SeasonPodium } from './card/SeasonPodium';

import { StoreContext } from '../utils/store';

import './styling/competition.css';

export const Competition = () => {
    const { state } = useContext(StoreContext);

    const { competitions, user } = state;

    const [currentSeason, setCurrentSeason] = useState([]);
    const [previousSeasons, setPreviousSeasons] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const { seasons } = competitions[0];

        setCurrentSeason(seasons.slice(seasons.length - 1));

        setPreviousSeasons(seasons.slice(0, seasons.length - 1));
    }, [competitions]);

    console.log(currentSeason, previousSeasons);

    const handleClick = (id) => navigate(`/${user}/${competitions.id}/${id}`);

    return (
        <div className="competition-page">
            <h1>Mario Kart</h1>
            <button onClick={() => handleClick('create')}>Create new season</button>

            <h2>Current Season</h2>
            {currentSeason.map((season, index) => {
                return (
                    <>
                        <div className="card season-card" key={index}>
                            <CardTag title={season.title} handleClick={() => handleClick(season.id)} />

                            <div className="card-display">
                                <div className="podium season-podium">
                                    <h4>Pos</h4>
                                    <div className="podium-rounds">
                                        <div className="season-round">
                                            <h5>Round 5</h5>
                                            <h4>{`Mario Circuit`}</h4>
                                        </div>
                                    </div>
                                    <h4>Score</h4>
                                </div>
                                <SeasonPodium season={season} />
                            </div>
                        </div>
                    </>
                );
            })}
            <h2>Previous Seasons</h2>
            {previousSeasons.map((season, index) => {
                return (
                    <>
                        <div className="card season-card" key={index}>
                            <CardTag title={season.title} handleClick={() => handleClick(season.id)} />

                            <div className="card-display">
                                <div className="podium season-podium">
                                    <h4>Pos</h4>
                                    <div className="podium-rounds">
                                        <div className="season-round">
                                            <h5>Round 5</h5>
                                            <h4>{`Mario Circuit`}</h4>
                                        </div>
                                    </div>
                                    <h4>Score</h4>
                                </div>
                                <SeasonPodium season={season} />
                            </div>
                        </div>
                    </>
                );
            })}
        </div>
    );
};
