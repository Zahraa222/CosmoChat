import React, {useEffect,useState} from "react";
import { Button, Grid } from "@mui/material";
import Textarea from "@mui/material";
import OpenAI from "openai";
import { useParams } from "react-router-dom";
import useMediaQuery from "@mui/material";



const Chat = () => {
    const { id } = useParams();
    const {userPrompt, setUserPrompt} = useState("");
    const {RexReply, setRexReply} = useState("");
    const {sessions, setSessions} = useState([]);
    const {thisSession, setThisSession} = useState({});
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
    const openai = new OpenAI({apiKey: API_KEY, dangerouslyAllowBrowser: true});
    const matches = useMediaQuery("(max-width: 600px)");
    let chatKeys = [];
}


export default App;
