import React, { useEffect } from 'react'
import api from '../../api/sessions'
import {List, ListItem, ListItemText} from '@mui/material'


const ChatHistory = () => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {() => {
        const fetchSessions = async () => {
            try{
                const response =await api.get('sessions/histroy');
                setSessions(response.data);
            } catch(err){
                console.log('Failed to fetch sessions: ', err);
            };
        }
        fetchSessions();
    }}
    , []);

    return(
        <div>
            <h2>Chat History</h2>
            <List>
                {sessions.map((session) => (
                    <ListItem key={session.id}>
                        <ListItemText primary={session.id} secondary={session.createdAt} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default ChatHistory;