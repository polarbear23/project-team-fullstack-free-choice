import React,{ useState } from 'react';

function Competitors() {
    const [newCompetitionName, setNewCompetitionName] = useState('');
    const [competitors, setCompetitors] = useState([]);
    const [newCompetitorName, setNewCompetitorName] = useState("");
    const [newCompetitorNationality, setNewCompetitorNationality] = useState("");  
    const [newCompetitorEmail, setNewCompetitorEmail] = useState("");
    const [newCompetitorProfilePic, setNewCompetitorProfilePic] = useState("");
    const [statusMsg, setStatusMsg] = useState("");
    
    const handleChange = (e) => {
        setNewCompetitionName(
            
            e.target.value,
        )
    }
    console.log(competitors)

    const handleSubmit = (e) => {
        console.log("CHECK 2")
        e.preventDefault();
          setCompetitors([
              ...competitors,        
                {
                    competitorName: newCompetitorName,
                    competitorNationality: newCompetitorNationality,
                    competitorEmail: newCompetitorEmail,
                    competitorImageUrl: newCompetitorProfilePic,
                }
            ])
    }
    const handlePostSubmit = async (e) => {
        console.log("CHECK")
        try {
            let result = await fetch ("https://boolean-leaderboard.herokuapp.com/competition", {
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
                setNewCompetitorEmail("");
                setNewCompetitorProfilePic("");
                setStatusMsg("New competetion created")

            } else {
                setStatusMsg("Error detected");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className = "competition-form">
            
                <form className = "comp-form">
                <h2 className = "comp-form-text"> Create New Competition </h2>
                    <label>
                        Competition Name: {""}
                        <input
                            type = "text"
                            name = "competitonName"
                            value = {newCompetitionName}
                            // onChange = {(e) => setNewCompetitionName(e.target.value)}
                            onChange = {handleChange}
                    />
                    </label>
                </form>
                
                <form onSubmit = {handleSubmit} className = "competitor-form">
                    <label>
                    <h3>Create New Competitor : </h3>
                                Name: {""}
                                <input
                                    type = "text"
                                    name = "competitorName"
                                    value = {newCompetitorName}
                                    onChange = {(e) =>  setNewCompetitorName(e.target.value)}
                                />
                                Nationality: {""}
                                <input
                                    type = "text"
                                    name = "competitorNationality"
                                    value = {newCompetitorNationality}
                                    onChange= {(e) => setNewCompetitorNationality(e.target.value)}
                                />
                                Email: {""}
                                <input
                                    type = "text"
                                    name = "competitorEmail"
                                    value = {newCompetitorEmail} 
                                    onChange = {(e) => setNewCompetitorEmail(e.target.value)}
                                />
                                Profile Picture: {""}
                                <input
                                    type = "file"
                                    name = "competitorImageUrl"
                                    accept = "image/png, image/jpeg"
                                    value = {newCompetitorProfilePic}
                                    onChange= {(e) => setNewCompetitorProfilePic(e.target.value)}
                                />
                    </label>
                    <button type = "Submit" className = "submit-competitor" onSubmit = {handleSubmit}> Create New Participant </button>
                    
                </form>
            <button  onClick = {handlePostSubmit}>Create New Competition</button>

        </div>
    );
}

export default Competitors;




