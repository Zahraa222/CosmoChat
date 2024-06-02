import React from "react";
import {Paper, Typography} from "react";


const UserMessage = ({message}) => {
    return(
        <div style={{disply: 'flex', justifyContent: 'end', margin: '10px'}}>
            <Paper style={{padding: '10px 20px', maxWidth: '80%', background: '#c8e6b9', borderRadius: '20px'}}>
                <Typography variant="body1">{message}</Typography>
            </Paper>
        </div>
    )
}

export default UserMessage;