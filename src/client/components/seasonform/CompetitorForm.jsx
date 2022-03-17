import React, { useState } from 'react';



export const CompetitorForm = ({ form, setForm, formStep, setFormStep, competitors }) => {
    const currentFormStep = 2;
    

    

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
            <label><h2>Choose participants</h2></label>
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

            <div className="season-form-buttons">
                <button onClick={() => previousStep()}>Previous</button>
                <button onClick={() => nextStep()}>Next</button>
            </div>
        </div>
    )
}