import React from 'react';
import { Link } from 'react-router-dom';

import CompetitionCard from './CompetitionCard';

import './styling/homepage.css'

function Homepage() {

    //fetch competitions with adminId = logged-in user
    //save them to state and map through thier competitions, returning a CompetitionCard for each

    return (
        <main className="app-homepage">
            <Link to="/create">
                <button className="create-competition-button">Create Competition</button>
            </Link>

            <div className="competition-display">
                    <CompetitionCard />
                    <CompetitionCard />
                    <CompetitionCard />
            </div>
        </main>
    )
}

export default Homepage