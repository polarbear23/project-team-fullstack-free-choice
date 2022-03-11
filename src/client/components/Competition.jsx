import React from 'react'
import { useNavigate } from 'react-router-dom';

import './styling/competition.css'

import { CardTag } from './card/CardTag';
import { SeasonPodium } from './card/SeasonPodium';

export const Competition = ({ user }) => {

    const navigate = useNavigate();

    const competitionId = 1

    const handleClick = seasonName => {
        navigate(`/${user}/${competitionId}/${seasonName}`)
    }

    return (
        <div className="competition-page">
            
            <h1>Mario Kart</h1>
            <button>Create new season</button>
            <h2>Current Season</h2>

            {/* This div gets mapped BELOW "PREVIOUS SEASONS"; each season within a competition */}
            <div className="card season-card">

                <CardTag
                    title={"Flower Cup"}
                    handleClick={() => handleClick("flower-cup")}
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

            <h2>Previous Seasons</h2>

            
        </div>
        
    )
}

