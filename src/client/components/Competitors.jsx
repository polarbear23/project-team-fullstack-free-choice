import React,{ useState } from 'react';

function Competitors() {
    const [newCompetitionName, setNewCompetitionName] = useState('');
    const [competitors, setCompetitors] = useState([]);
    const [newCompetitorName, setNewCompetitorName] = useState("");
    const [newCompetitorNationality, setNewCompetitorNationality] = useState("");  
    const [errorMsg, setErrorMsg] = useState("");
    
    const handleChange = (e) => {
        setNewCompetitionName({
            ...newCompetitionName,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
          setCompetitors([
              ...competitors,        
                {
                    competitorName: newCompetitorName,
                    competitorNationality: newCompetitorNationality,
                }
            ])
        
    }
    const handlePostSubmit = async (e) => {
        try {
            let result = await fetch ("https://boolean-leaderboard.herokuapp.com", {
                method: "POST",
                body: JSON.stringify({
                    competitionName: newCompetitionName,
                    competitor: competitors,
                    
                })
            })
            let myResult = await result.json()
            if (result.status === 200) {
                setNewCompetitionName("");
                setNewCompetitorName("");
                setNewCompetitorNationality("");
                setErrorMsg("New competetion created")

            } else {
                setErrorMsg("Error detected");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className = "Competition-Form">
            <h2 className = "CompFormText"> Competition Name </h2>
            <form className = "CompForm">
                <label>
                    Competition Name: {""}
                    <input
                        type = "text"
                        name = "competitonName"
                        value = {newCompetitionName}
                        onChange = {handleChange}
                   />
                </label>
            </form>
            
            <form onSubmit = {handleSubmit} className = "CompetitorForm">
                <label>
                    Competitor : ""
                            
                            <input
                                type = "text"
                                name = "competitorName"
                                value = {newCompetitorName}
                                onChange = {(e) =>  setNewCompetitorName(e.target.value)}
                            />
                            {/* Nationality: {''} */}
                            <input
                                type = "text"
                                name = "competitorNationality"
                                value = {newCompetitorNationality}
                                onChange= {(e) => setNewCompetitorNationality(e.target.value)}
                            />                 
                </label>
                <button type = "Submit" className = "SubmitCompetitor"> Create New Participant </button>
                
            </form>

        </div>
    )
}

export default Competitors;




