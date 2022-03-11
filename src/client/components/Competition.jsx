import React from 'react'
import { useNavigate } from 'react-router-dom';

import './styling/competition.css'

export const Competition = ({ user }) => {

    const navigate = useNavigate();

    const competitionId = 1

    const handleClick = seasonName => {
        navigate(`/${user}/${competitionId}/${seasonName}`)
    }

    return (
        <div className="single-competition">
            
            <h1 className="competition-title">Mario Kart</h1>
            <button className="create-season-button">Create new season</button>
            <h2 className="current-season-title">Current Season</h2>

            {/* This div gets mapped BELOW "PREVIOUS SEASONS"; each season within a competition */}
            <div className="season-card">

                <aside className="title-tag">
                    <div className="tag-container">
                        <h2>Flower Cup</h2>
                        
                        <button className="season-expand-button" onClick={() => handleClick("flower-cup")}>
                            View
                        </button>
                        
                    </div>
                </aside>

                <div className="card-display season-display">

                    <div className="card-legend">
                        <div className="season-rounds">

                            {/* This div gets mapped; 4 most recent rounds */}
                            <div className="season-round">
                                <h4>Round 5</h4>
                                <h3>{`Mario Circuit`}</h3>
                            </div>

                        </div>
                    </div>

                    <div className="card-podium">

                        {/* This div gets mapped; participants sorted by score */}
                        <div className="podium-place season-podium-place">

                            <div className="participant-display season-participant-display">
                                <p>1</p>
                                <div className="participant-img"></div>

                                <div className="participant-details">
                                    <p className="participant-name">Steve</p>
                                    <p className="participant-nationality">Canada</p>
                                </div>
                            </div>

                            <div className="round-breakdown">
                                {/* This gets mapped; participant's palcement for 4 most recent rounds */}
                                <h4 className="participant-round-placement">1</h4>
                            </div>

                            <div className="participant-score">
                                <h3 className="score">127</h3>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <h2 className="current-season-title">Previous Seasons</h2>

            
        </div>
        
    )
}

