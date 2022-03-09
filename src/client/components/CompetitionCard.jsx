import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './styling/competition-card.css'

function CompetitionCard() {

    //const { competition } = props

    //find competitors with the 3 highest scores
    //(competitionId > many competitors > many participants > many placements > calculate and sum positionMapping)

    let navigate = useNavigate();

    const dummyData = [
        {
            name: "Steve",
            nationality: "Great Britian",
            score: 127
        },
        {
            name: "Nathan",
            nationality: "France",
            score: 103
        },
        {
            name: "Edward",
            nationality: "Canada",
            score: 94
        }
    ]

    const [podium, setPodium] = useState([])

    useEffect(() => {
        setPodium(dummyData)
    },[])

    const handleClick = () => {
        navigate('/competition/1') //view specific competition
    }

    return (
        <div className="competition-card">

            <aside className="title-tag">
                <div className="tag-container">
                    <h2>Mario Kart</h2>
                    
                    <button className="competition-link-button" onClick={() => handleClick()}>
                        View
                    </button>
                    
                </div>
            </aside>

            <div className="card-display">

                <h3>Top 3</h3>

                <div className="card-podium">

                    {podium.map((participant, index) => {

                        return (
                            <div key={index} className="podium-place">

                                <div className="participant-display">
                                    <p>{index + 1}</p>
                                    <div className="participant-img"></div>

                                    <div className="participant-details">
                                        <p className="participant-name">{participant.name}</p>
                                        <p className="participant-nationality">{participant.nationality}</p>
                                    </div>
                                </div>

                                <div className="participant-score">{participant.score}</div>
                            </div>
                        )

                    })}
                </div>
            </div>
        </div>
    )
}

export default CompetitionCard