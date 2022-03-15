import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './styling/card.css';

import { CardTag } from './card/CardTag';
import { PodiumParticipant } from './card/PodiumParticipant';

export const CompetitionCard = ({ competitionId, user, competition }) => {
  const [seasonScores, setSeasonScores] = useState([]);
  const [podium, setPodium] = useState([]);

  console.log(competition);
  //find competitors with the 3 highest scores
  //(competitionId > many competitors > many participants > many placements > calculate and sum positionMapping)
  const calculateTotalScore = (season) => {
    const { participants, positionMappings } = season;
    const scoresForSeason = [];
    for (let i = 0; i < participants.length; i++) {
      const participantScore = {
        competitor: participants[i].competitor,
        score: 0,
      };
      for (let j = 0; j < participants[j].placements.length; j++) {
        for (let k = 0; k < positionMappings.length; k++) {
          if (positionMappings[k].position === participants[i].placements[j].position) {
            participantScore.score = participantScore.score + positionMappings[k].mapping;
          }
        }
      }
      scoresForSeason.push(participantScore);
      scoresForSeason.sort(compareScores);
    }
    console.log(scoresForSeason);
    return scoresForSeason;
  };

  const compareScores = (firstEl, secondEl) => {
    if (firstEl.score > secondEl.score) {
      return -1;
    }
    if (firstEl.score < secondEl.score) {
      return 1;
    }
    return 0;
  };

  let navigate = useNavigate();

  useEffect(() => {
    if (!competition) return;
    const scores = calculateTotalScore(competition.seasons[competition.seasons.length - 1]);
    setSeasonScores(scores);
    console.log(seasonScores);
    setPodium([scores[0], scores[1], scores[2]]);
    //setPodium(competition);
  }, []);

  const handleClick = () => {
    navigate(`/${user}/${competitionId}`);
  };

  return (
    <div className="card competition-card">
      <CardTag title={competition.title} handleClick={(e) => handleClick(e)} />
      <div className="card-display">
        <h3>Top 3</h3>
        {podium &&
          podium.map((participant, index) => {
            return (
              <div key={index} className="podium competition-podium">
                <PodiumParticipant participant={participant.competitor} index={index} />
                <div className="participant-score">{participant.score}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
