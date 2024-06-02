import React, { useEffect, useState } from "react";
import api from "../../api/sessions";
import {List, ListItem, ListItemText} from "@mui/material";


const EndedChats = () => {
    const [endedSessions, setEndedSessions] = useState([]);

    useEffect(() => {
        const fetchEndedSessions = async () => {
            try {
                const response = await api.get('/sessions/ended');
                setEndedSessions(response.data);
            } catch (err){
                console.error("Failed to fetch ended sessions: ", err);
            }
        }
        fetchEndedSessionsq();
    },[]);

    return(
        <div>
            <h2>Ended Chat Sessions</h2>
            <List>
                {endedSessions.map((session) => (
                    <ListItem key={session.id} Button>
                        <ListItemText primary={session.id} secondary={session.createdAt} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default EndedChats;