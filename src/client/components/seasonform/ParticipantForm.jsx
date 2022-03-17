import React, { useState } from 'react';

export const ParticipantForm = ({ form, setForm, formStep, setFormStep }) => {
    const currentFormStep = 4;
    const [shadowParticipants, setShadowParticipants] = useState([])

    const handleChange = e => {
        const updatedParticipants = [ ...shadowParticipants ]
        if (updatedParticipants.some(p => p.id === e.id)) {
            const i = updatedParticipants.findIndex(p => p.name === e.id)
            updatedParticipants[i] = { competitorId: e.id, team: e.value}
        } else {
            updatedParticipants.push({ competitorId: e.id, team: e.value})
        }
        
        setShadowParticipants(updatedParticipants)
    }

    const nextStep = () => {
        if (formStep !== currentFormStep || shadowParticipants.length !== form.participants.length) return;
        setForm({ ...form, participants: [...shadowParticipants] })
        setFormStep(currentFormStep + 1)
    }
    const previousStep = () => setFormStep(currentFormStep - 1)

    return (
        <div className="form-participant">
            <label><h2>Choose participants</h2></label>
            <ul>
                {form.participants.map((participant, index) => {
                    return (
                        <li key={index}>
                            <label htmlFor={participant.name}>{participant.name}</label>
                            <select id={participant.id} onChange={e => handleChange(e.target)}>
                                <option value={null} hidden={true} defaultValue>Choose team</option>
                                {form.teams.map((team, index) => {
                                    return (
                                        <option key={index} value={team.name}>{team.name}</option>
                                    )
                                    
                                })}
                            </select>
                        </li>
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