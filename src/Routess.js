import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import Home from "./Home";

class Routess extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={App} exact />
        <Route path="/home" component={Home} />
      </Router>
    );
  }
}

export default Routess;
