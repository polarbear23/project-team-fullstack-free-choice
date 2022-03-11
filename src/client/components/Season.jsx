import React from 'react';

import './styling/season.css'

import { CardTag } from './card/CardTag';
import { RoundPodium } from './card/RoundPodium';

export const Season = () => {

    return (
        <div className="season-page">
            <h2>Mario Kart</h2>
            <h1>Flower Cup</h1>
            
            {/*dropdown needs styled*/}
            <select className="select-round-dropdown" name="rounds">
                <option value="1">{`Mario Circuit`}</option>
                <option value="2">{`Coconut Mall`}</option>
                <option value="3">{`DK Summit`}</option>
                <option value="4">{`Wario's Gold Mine`}</option>
            </select>

            <div className="card round-card">

                <CardTag
                    title={"Mario Circuit"}
                />

                <div className="card-display">

                    <div className="podium round-podium">
                        <h4>Position</h4>
                        <h4>Team</h4>
                        <h4>Points</h4>
                        <h4>Score</h4>
                    </div>

                    {/* This div gets mapped; participants sorted by score */}
                    <RoundPodium />

                </div>
            </div>
        </div>
        

    )
}
