import React, { Component } from "react";
import { connect } from "react-redux";

class Film extends Component {
  render() {
    return (
      <div>
        <h1>FILM</h1>
      </div>
    );
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    type: "ACTIVE_ITEM",
    ActiveItem: "film",
  };
};

export default connect(null, mapDispatchtoProps)(Film);
