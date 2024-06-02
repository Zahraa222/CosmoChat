import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
    return(
        <Box style={{padding: '20px', textAlign:'center'}}>
            <Typography variant="h2" gutterBottom> Welcome to CosmoChat</Typography>
            <Typography variant="h4" gutterBottom> Your personal AI chat assistant</Typography>
            <Button variant="contained" color="primary" component={Link} to="/chats">Start Chatting</Button>
            <Button variant="contained" color="secondary" component={Link} to="/Activity">View Activity</Button>
        </Box>
    );
};

export default Home;