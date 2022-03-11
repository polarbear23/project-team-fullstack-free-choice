import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './styling/card.css'

import { CardTag } from './card/CardTag';
import { PodiumParticipant } from './card/PodiumParticipant';

export const CompetitionCard = ({ competitionId, user }) => {

    console.log(competitionId)

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
        navigate(`/${user}/${competitionId}`)
    }

    return (
        <div className="card competition-card">

            <CardTag
                title={"Mario Kart"}
                handleClick={e => handleClick(e)}
            />

            <div className="card-display">

                <h3>Top 3</h3>

                {podium.map((participant, index) => {

                    return (
                        <div key={index} className="podium competition-podium">

                            <PodiumParticipant />

                            <div className="participant-score">{participant.score}</div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}