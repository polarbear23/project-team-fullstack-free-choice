import React from 'react';

import './styling/season.css'

export const Season = () => {

    return (
        <div className="single-season">
            <h1 className="competition-title">Flower Cup</h1>
            <select className="select-round-dropdown" name="rounds">
                <option value="1">{`Mario Circuit`}</option>
                <option value="2">{`Coconut Mall`}</option>
                <option value="3">{`DK Summit`}</option>
                <option value="4">{`Wario's Gold Mine`}</option>
            </select>

            <div className="round-card">

                <aside className="title-tag">
                    <div className="tag-container">
                        <h2>Mario Circuit</h2>                       
                    </div>
                </aside>

                <div className="card-display round-display">

                    <div className="round-legend">
                        <h3>Position</h3>
                        <h3>Team</h3>
                        <h3>Points</h3>
                        <h3>Total</h3>
                    </div>

                    <div className="card-podium">

                        {/* This div gets mapped; participants sorted by score */}
                        <div className="podium-place round-podium-place">

                            <div className="participant-display round-participant-display">
                                <p>1</p>
                                <div className="participant-img"></div>

                                <div className="participant-details">
                                    <p className="participant-name">Steve</p>
                                    <p className="participant-nationality">Canada</p>
                                </div>
                            </div>


                            <h4 className="round-team">1</h4>
                            <h4 className="round-score">1</h4>


                            <div className="participant-score">
                                <h3 className="score">127</h3>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        

    )
}
