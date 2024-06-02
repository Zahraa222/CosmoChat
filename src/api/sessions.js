import axios from "axios";


//create axios instance
const api = axios.create({
    baseURL: "http://localhost:3001/sessions",

});

//get all sessions
export const getSessions = () => {
    returnaxios.get("/");
}

//get specific session
export const getSession = (id) => {
    return axios.get(`/${id}`);
}



//create new session
export const createSession = (sessionData) => {
    return axios.post("/", data);
}


//update session
export const updateSession = (is, sessionData) => {
    return
}


//delete session
export const deleteSession = (id) => {
    return axios.delete(`/${id}`);
}


//export API functions
export default {
    getSessions,
    getSession,
    createSession,
    updateSession,
    deleteSession,
};