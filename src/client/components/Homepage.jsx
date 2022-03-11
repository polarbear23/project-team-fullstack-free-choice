import React from 'react';
import { Link } from 'react-router-dom';

import { CompetitionCard } from './CompetitionCard';

import './styling/homepage.css'

export const Homepage = () => {

    //fetch competitions with adminId = logged-in user
    //save them to state and map through thier competitions, returning a CompetitionCard for each
    const user = "nathan";
    const dummyData = [
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 3
        }
    ]

    return (
        <main className="app-homepage">
            <Link to="/create">
                <button className="create-competition-button">Create Competition</button>
            </Link>

            <div className="competition-display">
                {dummyData.map((competition, index) => {
                    return (
                        <CompetitionCard
                            key={index}
                            competitionId={competition.id}
                            user={user} 
                        />
                    )
                })}
            </div>


        </main>
    )
}