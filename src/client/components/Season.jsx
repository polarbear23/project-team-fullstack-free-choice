import React, { useContext, useEffect, useState } from 'react';

import './styling/season.css';

import { CardTag } from './card/CardTag';
import { RoundPodium } from './card/RoundPodium';

import { StoreContext } from '../utils/store';

export const Season = () => {
    const { state } = useContext(StoreContext);

    const { competitions } = state;

    const [selectedSeason, SetSelectedSeason] = useState([]);
    const [selectedRound, setSelectedRound] = useState([]);
    const [sortedParticipants, setSortedPartitcipants] = useState([]);

    console.log('states', { selectedSeason, selectedRound, sortedParticipants });

    useEffect(() => {
        const id = 2;

        const filteredSeason = competitions[0].seasons.filter((season) => season.id === id);

        SetSelectedSeason(filteredSeason);
    }, []);

    useEffect(() => {
        if (!selectedSeason.length) {
            return;
        }

        setSelectedRound([selectedSeason[0].rounds[0]]);
    }, [selectedSeason]);

    const onChangeHandler = (event) => {
        console.log(event.target.value);

        const filteredRound = selectedSeason[0].rounds.filter((round) => round.id === Number(event.target.value));

        setSelectedRound(filteredRound);
    };

    useEffect(() => {
        if (!selectedRound.length) {
            return;
        }

        const placements = [...selectedRound[0].placements];

        placements.sort((a, b) => a.position - b.position);

        const array = [];

        placements.map((placement) => {
            selectedSeason[0].participants.map((participant) => {
                if (placement.participantId === participant.id) {
                    const newObject = { placement, participant };
                    array.push(newObject);
                }
            });
        });

        setSortedPartitcipants(array);
    }, [selectedRound]);

    return (
        <>
            {selectedSeason.length && (
                <div className="season-page">
                    <h2>{competitions[0].title}</h2>
                    <h1>{selectedSeason[0].title}</h1>

                    <select className="select-round-dropdown" name="rounds" onChange={onChangeHandler}>
                        {selectedSeason[0].rounds.map((round) => (
                            <option className="dropdown-option" value={round.id} key={round.id}>
                                {round.title}
                            </option>
                        ))}
                    </select>
                    {selectedRound.length && (
                        <div className="card round-card">
                            <CardTag title={selectedRound[0].title} />

                            <div className="card-display">
                                <div className="podium round-podium">
                                    <h4>Position</h4>
                                    <h4 className="team-score">Team</h4>
                                    <h4 className="team-score">Team Points</h4>
                                    <h4>Points</h4>
                                </div>
                                {sortedParticipants.map((element, index) => (
                                    <RoundPodium element={element} index={index} key={index} season={selectedSeason[0]} round={selectedRound}/>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
