import React, { Component } from "react";
import { connect } from "react-redux";

class Actor extends Component {
  render() {
    return (
      <div>
        <h1>ACTOR</h1>
      </div>
    );
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    type: "ACTIVE_ITEM",
    ActiveItem: "actor",
  };
};

export default connect(null, mapDispatchtoProps)(Actor);
