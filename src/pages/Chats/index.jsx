import React, {useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import api from "../../api/sessions";
import ChatStyles from "../../styles/chat";
import Images from "../../constants/images";
import RexMessage from "../../components/RexMessage";
import UserMessage from "../../components/UserMessage";
import OpenAI from "openai";
import { Button, Grid } from "@mui/material";
import Textarea from "@mui/base/TextareaAutosize";
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

useEffect(() => {
    const fetchSession = async () => {
        try {
            const response = await api.get("/sessions");
            setSessions(response.data);
            setThisSession(
                response.data.find(
                    (session) => parseInt(session?.id, 10) === parseInt(id, 10)
                )
            );
            handleScroll();
            window.addEventListener("scroll", handleScroll);
        }
        catch(error){
            if (error.response){
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            else{
                console.log(error);
            }
        }
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }
    fetchSession();
}, []);

const handleScroll = () => {
    const ScrollPos = window.scrollY;
};

const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedSession = {};

    setTimeout(async function () {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        const formattedDate = months[month] + " " + day + " " + year;
        callOpenAIAPI();
        thisSession.chats.push({user: userPrompt, ReX: RexReply});
        updatedSession = {
            id: id,
            date, formattedDate,
            chats: thisSession.chats,
            isSessionEnded: thisSession.isSessionEnded,
        };
        for (let i = 0; i < updatedSession.chats.length; i++) {
            chatKeys.push(Object.keys(updatedSession.chats[i]));
        }

        try{
            await api.patch(`/sessions/${id}`, updatedSession);
            setSessions(
                sessions.map((session) =>
                    session.id === id ? updatedSession : session
                )
            );
            setUserPrompt("");
        }
        catch(err){
            console.log(`error: ${err.message}`);
        }

    })};


export default App;
