import React, { useState } from 'react';

export const TeamForm = ({ form, setForm, formStep, setFormStep }) => {
    const currentFormStep = 3;
    const [teams, setTeams] = useState([])
    const [team, setTeam] = useState("")

    const handleChange = e => setTeam(e.value)

    const addTeam = () => {
        if (!team || teams.includes(team)) return
        setTeams([...teams, {name: team}])
        setTeam("")
    }

    const nextStep = () => {
        if (!teams.length || formStep !== currentFormStep) return
        setForm({...form, teams: teams})
        setFormStep(currentFormStep + 1)
    }
    const previousStep = () => setFormStep(currentFormStep - 1)

    return (
        <div className="form-team">
            <label>
                <h2>Create Team</h2>
                <input
                    name="title"
                    type="text"
                    value={team}
                    onChange={e => handleChange(e.target)}
                />
                <button onClick={() => addTeam()}>New Team</button>
            </label>
            
            <ul>
            {teams.map((team, index) => {
                return (
                    <li key={index}>{team.name}</li>
                )
            })}
            </ul>
            
            <div className="season-form-buttons">
                
                <button onClick={() => previousStep()}>Previous</button>
                <button onClick={() => nextStep()}>Next</button>
            </div>
        </div>
    )
}