import React from 'react'
import { Link } from 'react-router-dom'
import {AppBar, Toolbar, Typography, Button} from '@mui/material'

const Navigation = () => {
    return(
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{flexGrow: 1}}>
                    Cosmochat
                </Typography>
                <Button color="inherit" component={Link} to="/"> Home </Button>
                <Button color="inherit" component={Link} to="/chats">Chats</Button>
                <Button color="inherit" component={Link} to="/history">Chat History</Button>
                <Button colot = "inherit" component={Link} to="/activity">Activity</Button>
            </Toolbar>
        </AppBar>
    )
}


export default Navigtion;