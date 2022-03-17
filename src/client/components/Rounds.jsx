import React, { useContext, useEffect, useState } from "react";

import { StoreContext } from "../utils/store";
import { API_URL, HTTP_METHOD, LOCAL_STORAGE } from "../config";

export const Rounds = ({toggleFetch, setToggleFetch}) => {
    const { state } = useContext(StoreContext);
    console.log(state)

    const [participants, setParticipants] = useState([])
    const [placements, setPlacements] = useState([])
    const [form, setForm] = useState({
        title: "",
        startsAt: ""
    })

    const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);

    console.log(form)

    const fetchSeason = async() => {
        const response = await fetch(API_URL.SEASON_GET, {
            method: HTTP_METHOD.GET,
            headers: {
                Authorization: token,
            }
        });
        const results = await response.json();
        return results.data.participants;
    }

    const postForm = async(formToPost) => {
        const response = await fetch(API_URL.ROUND_POST, {
            method: HTTP_METHOD.POST,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify(formToPost),
        });
        const results = await response.json();
        console.log(results)
        setToggleFetch(!toggleFetch)
    }

    const constructForm = async() => {
        if (!form.title) {
            alert("rounds must have a title")
            return
        }

        const newForm = {
            title: form.title,
            startsAt: `${form.startsAt}:00Z`,
            seasonId: state.selectedSeason[0].id,
            placements: placements
        }
        postForm(newForm);
    }

    useEffect(async() => {
        const res = await fetchSeason()
        setParticipants(res)
    }, [])

    useEffect(() => {
        if (participants.length < 1) return
        setPlacements(Array(participants.length).fill(null))
    }, [participants])

    const handleChangeForm = e => {
        setForm({...form, [e.name]: e.value})
    }

    const handleChange = (e, index) => {
        const newPlacements = [...placements];
        newPlacements[index] = { participantId: Number(e.value), position: index + 1}
        setPlacements(newPlacements)
    }

    const handleClick = () => {
        const allIds = []
        placements.map(placement => {
            if (placement) allIds.push(placement.participantId)
        })
        const uniqueIds = new Set(allIds)
        console.log("allIds", allIds)
        console.log("uniqueIds", uniqueIds)

        if (uniqueIds.size === participants.length) constructForm()
    }

    const findSuffix = (i) => {
        const j = i % 10,
        k = i % 100;
        if (j == 1 && k != 11) {
            return "st";
        }
        if (j == 2 && k != 12) {
            return "nd";
        }
        if (j == 3 && k != 13) {
            return "rd";
        }
        return "th";
    }

    return (
        <div className="Rounds">
            <label>Round name:</label>
            <input name="title" type="text" onChange={e => handleChangeForm(e.target)}></input>
            <label>Time</label>
            <input name="startsAt" type="datetime-local" onChange={e => handleChangeForm(e.target)}></input>
            <ul>
                {placements && placements.map((placement, index) => {
                    const pos = index + 1
                    return (
                        <li key={index}>
                            <label>{`${pos}${findSuffix(pos)}`}</label>
                            <select className="round-participant-select" onChange={e => handleChange(e.target, index)}>
                                <option key="default" value="" hidden default>Select participant...</option>
                                {participants.map((participant, index) => {

                                    return (
                                        <option key={index} value={participant.id}>
                                            {participant.competitor.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </li>
                    )
                })}
            </ul>
            <button onClick={() => handleClick()}>Create round</button>
        </div>
    );
};
