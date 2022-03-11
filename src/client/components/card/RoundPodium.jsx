import React from 'react';

import { PodiumParticipant } from './PodiumParticipant';

export const RoundPodium = () => {

    return (
        <div className="podium round-podium">

        <PodiumParticipant />

        <h4>1</h4>
        <h4>1</h4>

        <div className="participant-score">
            <h3>127</h3>
        </div>
    </div>
    )
}