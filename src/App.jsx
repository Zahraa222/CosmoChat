import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ChatHistory from "./components/ChatHistory";
import Home from "./pages/Home";
import Activity from "./pages/Activity";
import EndedChats from "./pages/EndedChats";
import Chats from "./pages/Chats";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/chats" component={Chats} />
        <Route path="/history" component={ChatHistory} />
        <Route path="/activity" component={Activity} />
        <Route path="endedchats" component={EndedChats} />
      </Switch>
    </Router>
  );
}

export default App;
