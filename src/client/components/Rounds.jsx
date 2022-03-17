import { disallow } from "joi"
import React, { useEffect, useState } from "react"
// import { HTTP_METHOD } from "../config"

const Rounds = () => {
  
    const [availablePositions, setAvailablePositions] = useState([])
    // const [bob, setBob] = useState(false);
   
    useEffect(() => {
        const positions = Array.from(
            { length: placeholderParticipants.length },
            (_, i) => i + 1
        )
    
      setAvailablePositions(positions); /*fills available positions */
    }, [])
    

    const placeholderParticipants = [
        {
            participantId: 1,
        },
        {
            participantId: 2,
        },
        {
            participantId: 3,
        },
        {
            participantId: 4,
        },
        {
            participantId: 5,
        },
        {
            participantId: 6,
        },
        {
            participantId: 7,
        },
        {
            participantId: 8,
        },
        {
            participantId: 9,
        },
        {
            participantId: 10,
        },
    ];

    return (
        <div className = "Rounds">
            {/* <div>
                <button className = "fetch-participants-button" onSubmit = {getParticipantsById}>Click Here</button>
            </div> */}

            <div className = "participants-by-id">
                {placeholderParticipants.map((participant) => {
                    return (
                        <label htmlFor={`participant ${participant.participantId}`}>
                            {`participant ${participant.participantId}`}
                            <select name={`participant ${participant.participantId}`}>
                                {availablePositions.map((position) => {
                                    return (
                                        <option 
                                            value={position}
                                            onSelect={disallow}
                                            
                                        >
                                            {`position ${position}`}
                                        </option>
                                    )
                                })}
                            </select> 
                        </label>
                    )
                })}
            </div>
        </div>
    )
}
export default Rounds;