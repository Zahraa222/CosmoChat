import React from "react";
import {Paper, Typography} from '@mui/material';

const ZarcoMessage = ({message}) => {
    return(
        <div style = {{display: 'flex', justifyContent: 'start', margin: '10px'}}>
            <Paper stylr={{padding: '10px 20px', maxWidth: '80%', background: '#f3f3f3', borderRadius: '20px'}}>
                <Typography variant="body1">{message}</Typography>
            </Paper>
        </div>
    );
}

export default ZarcoMessage;