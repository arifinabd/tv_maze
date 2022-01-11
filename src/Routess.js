import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Actor from "./Actor";
import App from "./App";
import Film from "./Film";
import Home from "./Home";
import ProtectedRoute from "./auth/protected-route";

class Routess extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={App} exact />
        <Route path="/home" component={Home} />
        <ProtectedRoute path="/film" component={Film} />
        <ProtectedRoute path="/actor" component={Actor} />
      </Router>
    );
  }
}

export default Routess;
