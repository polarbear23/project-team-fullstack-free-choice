import React, { useState } from "react";

import "./styling/competitors.css";

export const Competitors = () => {
  const [newCompetitionName, setNewCompetitionName] = useState("");
  const [competitors, setCompetitors] = useState([]);
  const [newCompetitorName, setNewCompetitorName] = useState("");
  const [newCompetitorNationality, setNewCompetitorNationality] = useState("");
  const [newCompetitorEmail, setNewCompetitorEmail] = useState("");
  const [newCompetitorProfilePic, setNewCompetitorProfilePic] = useState("");

  const handleChange = (e) => {
    setNewCompetitionName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCompetitors([
      ...competitors,
      {
        name: newCompetitorName,
        nationality: newCompetitorNationality,
        email: newCompetitorEmail,
        competitorImageUrl: newCompetitorProfilePic,
      },
    ]);
  };
  const handlePostSubmit = async () => {
    const newObject = {
      title: newCompetitionName,
      competitors: competitors,
    };
    try {
      const response = await fetch("http://localhost:4000/competition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(newObject),
      });

      if (response.ok) {
        setNewCompetitionName("");
        setNewCompetitorName("");
        setNewCompetitorNationality("");
        setNewCompetitorEmail("");
        setNewCompetitorProfilePic("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="competition-form">
      <form className="comp-form">
        <h2 className="comp-form-text"> Create New Competition </h2>
        <label className="comp-name">
          Competition Name: {""}
          <input
            className="comp-name-input"
            type="text"
            name="competitonName"
            value={newCompetitionName}
            onChange={handleChange}
          />
        </label>
      </form>

      <form onSubmit={handleSubmit} className="competitor-form">
        
          <h3>Create New Competitor </h3>
          <label htmlFor="">Name
            <input
              type="text"
              name="competitorName"
              value={newCompetitorName}
              onChange={(e) => setNewCompetitorName(e.target.value)}
              className="input-field"
            />
          </label>
          <br />
          <label htmlFor="">Nationality         
            <input
              type="text"
              name="competitorNationality"
              value={newCompetitorNationality}
              onChange={(e) => setNewCompetitorNationality(e.target.value)}
              className="input-field"
            />
          </label>
          <br />
          <label htmlFor="">Email         
            <input
              type="text"
              name="competitorEmail"
              value={newCompetitorEmail}
              onChange={(e) => setNewCompetitorEmail(e.target.value)}
              className="input-field"
            />
          </label>
          <br />
          <label htmlFor="">Profile Picture
            <input
              type="file"
              name="competitorImageUrl"
              accept="image/png, image/jpeg"
              value={newCompetitorProfilePic}
              onChange={(e) => setNewCompetitorProfilePic(e.target.value)}
              className="input-field"
            />
          </label>
        
        <button
          type="Submit"
          className="submit-competitor"
          onSubmit={handleSubmit}
        >
          Create New Participant
        </button>
      </form>
      <button
        className="submit-completed-competition"
        onClick={handlePostSubmit}
      >
        Create New Competition
      </button>
    </div>
  );
};
