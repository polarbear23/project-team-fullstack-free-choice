import React from 'react';

export const PodiumParticipant = (props) => {
    const { participant, index } = props;

    return (
        <div className="podium-participant">
            <p className="podium-pos">{index + 1}</p>
            <div className="podium-img">
                <img src={participant.competitorImageUrl} height="75px" alt="" />
            </div>

            <div className="participant-details">
                <h3>{participant.name}</h3>
                <h4>{participant.nationality}</h4>
            </div>
        </div>
    );
};
