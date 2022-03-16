import React, { useEffect, useState } from 'react';

import { PodiumParticipant } from './PodiumParticipant';

export const SeasonPodium = (props) => {
    const { season } = props;

    const { participants, positionMappings } = season;

    const [seasonStandings, setSeasonStandings] = useState([]);

    //     for each participant,
    //     find team,
    //     find position per round,
    //     build array,
    //     sort by points
    //     map array

    useEffect(() => {
        // console.log('season', { participants, positionMappings });

        const standings = [];

        participants.map((participant) => {
            let participantPositions = [];

            participant.placements.map((placement) => participantPositions.push(placement.position));

            let pointsTotal = 0;

            participantPositions.map((position) => {
                let pointsForRound = positionMappings[position - 1].mapping;

                if (isNaN(pointsForRound)) {
                    pointsForRound = 0;
                }

                pointsTotal = pointsTotal + pointsForRound;
            });

            const pointsTotalforParticipant = {
                participant: participant,
                points: pointsTotal,
            };

            standings.push(pointsTotalforParticipant);
        });

        standings.sort((a, b) => b.points - a.points);

        setSeasonStandings(standings);
    }, [season]);

    return (
        <>
            {seasonStandings.map((standing, index) => {
                return (
                    <>
                        <div className="podium season-podium">
                            <PodiumParticipant participant={standing.participant.competitor} index={index} />

                            <div className="round-breakdown">
                                <h4>{index + 1}</h4>
                            </div>

                            <div className="participant-score">
                                <h3>{standing.points}</h3>
                            </div>
                        </div>
                    </>
                );
            })}
        </>
    );
};
