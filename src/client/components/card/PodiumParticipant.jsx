import React from 'react';

export const PodiumParticipant = ({ participant, index }) => {

  return (
    <div className="podium-participant">
      <p>{index + 1}</p>
      <div className="podium-img">
        {participant.competitorImageUrl &&
            <img src={participant.competitorImageUrl} height="75px" alt="" />
        }
      </div>

      <div className="participant-details">
        <h3>{participant.name}</h3>
        <h4>{participant.nationality}</h4>
      </div>
    </div>
  );
};
