import { useState } from "react"
import { HTTP_METHOD } from "../config"

const Rounds = () => {
    const [participantId, setParticipantId] = useState("")
    const [seasonNumber, setSeasonNumber] = useState("")
    const [roundPlacement, setRoundPlacement] = useState("")

    // const getRounds = async() => {
    //     const res = await fetch("http://localhost:4000", {
    //         method: HTTP_METHOD.GET,
    //         body: JSON.stringify()
    //     })
    // } 
    const getParticipantsById = () => {
        fetch("http://localhost:4000")
            .then(resp => resp.json())
            .then(data => {
                setParticipantId(data);
                console.log(data);
            })
    }

    return (
        <div className = "Rounds">
            <div>
                <button className = "fetch-participants-button" onSubmit = {getParticipantsById}>Click Here</button>
            </div>

            <div className = "participants-by-id">
                {participantId.map(() => {
                    const particpantName = 
                })}
            </div>
        </div>
    )
}