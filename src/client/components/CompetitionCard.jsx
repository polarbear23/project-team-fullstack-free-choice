import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './styling/card.css';

import { CardTag } from './card/CardTag';
import { PodiumParticipant } from './card/PodiumParticipant';

export const CompetitionCard = ({ competitionId, user, competition }) => {
  const [seasonScores, setSeasonScores] = useState([]);
  console.log(competition);
  //find competitors with the 3 highest scores
  //(competitionId > many competitors > many participants > many placements > calculate and sum positionMapping)
  const calculateTotalScore = (seasons) => {
    const scoresForEachSeason = [];
    for (let i = 0; i < competition.seasons.length; i++) {
      const { participants, positionMappings } = seasons[i];
      const participantsToScores = [];
      for (let j = 0; j < participants.length; j++) {
        const participantScore = {
          competitorId: participants[j].competitorId,
          score: 0,
        };
        for (let k = 0; k < participants[j].placements.length; k++) {
          for (let l = 0; l < positionMappings.length; l++) {
            if (
              positionMappings[l].position ===
              participants[j].placements[k].position
            ) {
              participantScore.score =
                participantScore.score + positionMappings[l].mapping;
            }
          }
        }
        participantsToScores.push(participantScore);
      }
      scoresForEachSeason.push(
        participantsToScores.sort((firstEl, secondEl) => {
          if (firstEl.score < secondEl.score) {
            return -1;
          }
          if (firstEl.score > secondEl.score) {
            return 1;
          }
          return 0;
        })
      );
      return scoresForEachSeason;
    }
  };

  let navigate = useNavigate();

  const [podium, setPodium] = useState([]);

  useEffect(() => {
    if (!competition) return;
    const results = calculateTotalScore(competition.seasons);
    console.log(results);
    //setPodium(competition);
  }, []);

  const handleClick = () => {
    navigate(`/${user}/${competitionId}`);
  };

  return (
    <div className="card competition-card">
      <CardTag title={'Mario Kart'} handleClick={(e) => handleClick(e)} />

      <div className="card-display">
        <h3>Top 3</h3>

        {podium &&
          podium.map((participant, index) => {
            return (
              <div key={index} className="podium competition-podium">
                <PodiumParticipant />

                <div className="participant-score">{participant.score}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
