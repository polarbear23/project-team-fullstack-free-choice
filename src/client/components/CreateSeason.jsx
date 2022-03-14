import React, { useState, useEffect } from 'react';

import { TitleForm } from './seasonform/TitleForm';
import { CompetitorForm } from './seasonform/CompetitorForm';
import { TeamForm } from './seasonform/TeamForm';
import { ParticipantForm } from './seasonform/ParticipantForm';
import { MappingForm } from './seasonform/MappingForm';

export const CreateSeason = () => {

    const competitionId = 1;

    const [form, setForm] = useState({
        competitionId: competitionId,
        title: "",
        participants: [],
        teams: [],
        mapping: [],
    })
    const [formStep, setFormStep] = useState(1)

    useEffect(() => {
        if(formStep === 6) postForm()
    }, [formStep])

    const postForm = () => {
        console.log(form)
    }

    return (
        <div className="create-season">
            <div>Form step: {formStep}</div>

            <TitleForm form={form} setForm={setForm} formStep={formStep} setFormStep={setFormStep}/>

            <CompetitorForm form={form} setForm={setForm} formStep={formStep} setFormStep={setFormStep}/>
                
            <TeamForm form={form} setForm={setForm} formStep={formStep} setFormStep={setFormStep}/>

            <ParticipantForm form={form} setForm={setForm} formStep={formStep} setFormStep={setFormStep}/>

            <MappingForm form={form} setForm={setForm} formStep={formStep} setFormStep={setFormStep}/>
        </div>
    )
}