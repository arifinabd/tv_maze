import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import LoginButton from "./components/login-button";
import LogoutButton from "./components/logout-button";

class App extends Component {
  render() {
    return (
      <div>
        <Menu pointing inverted color="blue">
          <Menu.Item
            name="home"
            as={Link}
            to="/home"
            active={this.props.activeItems === "home"}
            onClick={this.props.onClickedHeader}
          />
          <Menu.Item
            name="film"
            as={Link}
            to="/film"
            active={this.props.activeItems === "film"}
            onClick={this.props.onClickedHeader}
          />
          <Menu.Item
            name="actor"
            as={Link}
            to="/actor"
            active={this.props.activeItems === "actor"}
            onClick={this.props.onClickedHeader}
          />

          {this.props.activeItems === "home"}

          <Menu.Menu position="right">
            <LoginButton />
            <LogoutButton />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    activeItems: state.activeItems,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onClickedHeader: (e, { name }) => {
      const action = { type: "ACTIVE_ITEM", ActiveItem: name };
      dispatch(action);
    },
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
