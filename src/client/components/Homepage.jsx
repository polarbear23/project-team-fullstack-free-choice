import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPETITION_API_URL, HTTP_METHOD } from '../config';

import { CompetitionCard } from './CompetitionCard';

import './styling/homepage.css';

export const Homepage = () => {
  const [competitions, setCompetitions] = useState([]);
  //fetch competitions with adminId = logged-in user
  //save them to state and map through thier competitions, returning a CompetitionCard for each
  useEffect(() => {
    console.log('!');
    const getCompetitions = async () => {
      const res = await fetch(`${COMPETITION_API_URL.GET}`, {
        method: HTTP_METHOD.GET,
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      const results = await res.json();
      console.log('results', results);
      setCompetitions(results.data);
    };
    getCompetitions();
  }, []);

  const user = 'nathan';

  return (
    <main className="app-homepage">
      <Link to="/create">
        <button className="create-competition-button">
          Create Competition
        </button>
      </Link>

      <div className="competition-display">
        {competitions &&
          competitions.map((competition, index) => {
            return (
              <CompetitionCard
                key={index}
                competitionId={competition.id}
                competition={competition}
                user={user}
              />
            );
          })}
      </div>
    </main>
  );
};
