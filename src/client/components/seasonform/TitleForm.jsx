import React, { useState } from 'react';

export const TitleForm = ({ form, setForm, formStep, setFormStep }) => {
    const currentFormStep = 1;
    const [title, setTitle] = useState()

    const handleChange = e => setTitle(e.value)

    const nextStep = () => {
        if (title.length === 0 || formStep !== currentFormStep) return
        setForm({...form, title: title})
        setFormStep(currentFormStep + 1)
    }

    return (
        <div className="form-title">
            <label>
                Season Title
                <input
                    name="title"
                    type="text"
                    onChange={e => handleChange(e.target)}
                    required
                />
            </label>
            <button onClick={() => nextStep()}>Next</button>
        </div>
    )
}