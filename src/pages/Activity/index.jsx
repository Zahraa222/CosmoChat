import React, { useEffect, useState } from "react";
import api from "../../api/sessions";
import {Card, CardContent, Typography, Grid} from "@mui/material";



const Activity = () => {
    const [metrics, setMetrics] = useState({
        totalSessions: 0,
        activeSessions: 0,
        completedSessions: 0,
    });

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await api.get("sessions/metrics");
                setMetrics(response.data);
            } catch (err) {
                console.log("Failed to fetch metrics: ", err);
            }
        };
        fetchMetrics();


        return(
            <Grid container spacing={2} style={{padding: '20px'}}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" color="textSecondary">Total Sessions</Typography>
                            <Typography variant="h4">{metrics.totalSessions}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" color="textSecondary">Active Sessions</Typography>
                            <Typography variant="h4">{metrics.activeSessions}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" color="textSecondary">Completed Sessions</Typography>
                            <Typography variant="h4">{metrics.completedSessions}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    })
}

export default Activity;