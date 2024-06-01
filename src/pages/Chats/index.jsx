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
    }, 5000);
};

async function callOpenAIAPI() {
    const completion = await openai.completions.create({
        messages: [
            {
            role: "system",
            content: "Your name is Zarco. You are a skin care assistant. You give advice to customers on the best skin care products to use based on their skin type."
            },
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 100,
    });
    setRexReply(completion.data.choices[0].message.content);
}

return (
    <Grid container style={{ display: matches ? "none" : "block" }}>
        <Grid style={{ padding: "40px 24px 24px 24px", position: "sticky" }}>
            <img src={Images.homeRex} alt="Rex" style={{ width: "105px" }}/>
        </Grid>
        <Grid {...ChatStyles.textDisplayBackground}>
            <Grid>
                {thisSession?.chats?.length ? thisSession.chats.map((chat, i) =>
                    Object.keys(chat).map((k) =>
                        k === "Rex" ? (
                            <RexMessage RexMessage={chat.ReX} key={'rex' + i}/>
                        ) : (
                            <UserMessage userMessage={chat.user} key={'user' + i}/>
                        )
                    )
                ) : null}
            </Grid>
            {thisSession && !thisSession.isSessionEnded && (
                <Grid {...ChatStyles.toSendArea}>
                    <Textarea
                        {...ChatStyles.textArea}
                        name="Soft"
                        placeholder="Type a message to Zarco"
                        variant="soft"
                        onChange={(e) => setUserPrompt(e.target.value)}
                        value={userPrompt}
                    />
                    <Button onClick={handleSubmit} style={{ margin: "20px 0" }}>Send</Button>
                </Grid>
            )}
        </Grid>
    </Grid>
);
}

export default Chat;



