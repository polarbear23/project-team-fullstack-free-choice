import React, { useState } from 'react';

export const CompetitorForm = ({ form, setForm, formStep, setFormStep }) => {
    const currentFormStep = 2;
    const competitors = [
        { name: "Nathan" },
        { name: "Bravin" },
        { name: "Conor" },
        { name: "Seeb" },
    ];
    const [checked, setChecked] = useState(Array(competitors.length).fill(false));

    const handleChange = e => {
        const newChecked = [ ...checked ];
        newChecked[e.id] = !newChecked[e.id];
        setChecked(newChecked)
    }

    const nextStep = () => {
        if (formStep !== currentFormStep) return;
        const participants = competitors.filter((competitor, i) => checked[i])
        if (participants.length < 2) return
        setForm({...form, participants: participants})
        setFormStep(currentFormStep + 1)
    }
    const previousStep = () => setFormStep(currentFormStep - 1)


    return (
        <div className="form-competitor">
            <label>Choose participants</label>
            <ul>
                {competitors.map((competitor, index) => {
                    return (
                        <li key={index}>
                            <input
                                type="checkbox"
                                id={index}
                                onChange={e => handleChange(e.target)}
                                checked={competitors[index].checked}
                            />
                            <label>{competitor.name}</label>
                        </li>
                    )
                })}
            </ul>

            <button onClick={() => previousStep()}>Previous</button>
            <button onClick={() => nextStep()}>Next</button>
        </div>
    )
}