import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Actor from "./Actor";
import App from "./App";
import Film from "./Film";
import Home from "./Home";
import ProtectedRoute from "./auth/protected-route";

class Routess extends Component {
  render() {
    return (
      <Router>
        <App />
        <br />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/home" component={Home} />
          <ProtectedRoute path="/film" component={Film} />
          <ProtectedRoute path="/actor" component={Actor} />
        </Switch>
      </Router>
    );
  }
}

export default Routess;
