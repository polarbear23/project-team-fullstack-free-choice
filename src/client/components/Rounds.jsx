import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../utils/store";

const Rounds = () => {
  const { state } = useContext(StoreContext);
  const { selectedSeason } = state;
  const [availablePositions, setAvailablePositions] = useState([]);
  // const [bob, setBob] = useState(false);

  useEffect(() => {
    const positions = Array.from(
      { length: placeholderParticipants.length },
      (_, i) => i + 1
    );

    setAvailablePositions(positions); /*fills available positions */
  }, []);
  console.log(selectedSeason, 10);

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

  const handleSubmit = async () => {
    e.preventDefault();
    const result = await fetch("http://localhost:4000/round", {
      method: "POST",
      body: JSON.stringify({
        seasonId: selectedSeason.id,
        title: selectedSeason.title,
        placements: placeholderParticipants,
      }),
    });
    const resJson = await result.json();
    if (result.ok) {
        setSelectedSeason("")};
        setS
  };

  return (
    <div className="Rounds">
      <div className="participants-by-id">
        {placeholderParticipants.map((participant) => {
          return (
            <label htmlFor={`participant ${participant.participantId}`}>
              {`participant ${participant.participantId}`}
              <select name={`participant ${participant.participantId}`}>
                {availablePositions.map((position) => {
                  return (
                    <option value={position}>{`position ${position}`}</option>
                  );
                })}
              </select>
            </label>
          );
        })}
      </div>
      <div>
        <button className="fetch-participants-button" onSubmit={handleSubmit}>
          Click Here To Submit
        </button>
      </div>
    </div>
  );
};
export default Rounds;
