import React from 'react';

import { PodiumParticipant } from './PodiumParticipant';

export const SeasonPodium = () => {

    return (
        <div className="podium season-podium">

        <PodiumParticipant />

        <div className="round-breakdown">
            {/* This gets mapped; participant's placement for 4 most recent rounds */}
            <h4>1</h4>
        </div>

        <div className="participant-score">
            <h3>127</h3>
        </div>
    </div>
    )
}