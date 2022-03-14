import React, { useState } from 'react';

export const ParticipantForm = ({ form, setForm, formStep, setFormStep }) => {
    const currentFormStep = 4;
    const [shadowParticipants, setShadowParticipants] = useState([])

    const handleChange = e => {
        const updatedParticipants = [ ...shadowParticipants ]
        if (updatedParticipants.some(p => p.name === e.id)) {
            const i = updatedParticipants.findIndex(p => p.name === e.id)
            updatedParticipants[i] = { name: e.id, team: e.value}
        } else {
            updatedParticipants.push({ name: e.id, team: e.value})
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
        <div className="form-competitor">
            <label>Choose participants</label>
            <ul>
                {form.participants.map((participant, index) => {
                    return (
                        <li key={index}>
                            <label htmlFor={participant.name}>{participant.name}</label>
                            <select id={participant.name} onChange={e => handleChange(e.target)}>
                                <option value={null} hidden={true} defaultValue>Choose team</option>
                                {form.teams.map((team, index) => {
                                    return (
                                        <option key={index} value={team}>{team}</option>
                                    )
                                    
                                })}
                            </select>
                        </li>
                    )
                })}
            </ul>

            <button onClick={() => previousStep()}>Previous</button>
            <button onClick={() => nextStep()}>Next</button>
        </div>
    )
}