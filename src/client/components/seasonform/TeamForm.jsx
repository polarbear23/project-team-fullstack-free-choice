import React, { useState } from 'react';

export const TeamForm = ({ form, setForm, formStep, setFormStep }) => {
    const currentFormStep = 3;
    const [teams, setTeams] = useState([])
    const [team, setTeam] = useState("")

    const handleChange = e => setTeam(e.value)

    const addTeam = () => {
        if (!team || teams.includes(team)) return
        setTeams([...teams, team])
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
                Create Team
                <input
                    name="title"
                    type="text"
                    value={team}
                    onChange={e => handleChange(e.target)}
                />
            </label>
            <button onClick={() => addTeam()}>New Team</button>
            <button onClick={() => previousStep()}>Previous</button>
            <button onClick={() => nextStep()}>Next</button>
        </div>
    )
}