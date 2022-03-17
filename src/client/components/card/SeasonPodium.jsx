import React, { useEffect, useState } from 'react';

import { PodiumParticipant } from './PodiumParticipant';

import '../styling/competition.css';

export const SeasonPodium = (props) => {
    const { season } = props;

    const { participants, positionMappings, rounds } = season;
    console.log(season)
    const [seasonStandings, setSeasonStandings] = useState([]);
    if (seasonStandings) console.log(seasonStandings)

    useEffect(() => {
        let standings = participants.map((participant) => {
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

            return pointsTotalforParticipant;
        });

        standings.sort((a, b) => b.points - a.points);

        setSeasonStandings(standings);
    }, [season]);

    const generateDataForRounds = (standing) => {
        const arr = rounds.map((round) => round.placements.filter((placement) => placement.participantId === standing.participant.id));
        console.log(arr)
        return arr;
    }

    return (
        <>
            {seasonStandings.length && (
                <>
                    {seasonStandings.map((standing, index) => {
                        return (
                            <div className="podium season-podium" key={standing.id}>
                                <PodiumParticipant participant={standing.participant.competitor} index={index} />
                                <div className="round-breakdown">
                                    {generateDataForRounds(standing).map((round) => (
                                        <h4 key={round.id}>{round[0].position}</h4>
                                    ))}
                                </div>
                                <div className="participant-score">
                                    <h3>{standing.points}</h3>
                                </div>
                            </div>
                        );
                    })}
                </>
            )}
        </>
    );
};
