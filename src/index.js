import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reportWebVitals from "./reportWebVitals";
import Routess from "./Routess";

const stateFilm = {
  activeItems: "beranda",
};

const reducerFilm = (state = stateFilm, action) => {
  console.log("action nya => ", action);
  switch (action.type) {
    case "ACTIVE_ITEM":
      var stateActiveItems = { ...state, activeItems: action.ActiveItem };
      return stateActiveItems;
    default:
      return state;
  }
};

const store = createStore(reducerFilm);

ReactDOM.render(
  // <React.StrictMode>
  <Auth0Provider
    domain="m150bisa.us.auth0.com"
    clientId="M82m2hvPrXgQc40NHrwm2QzAHm1OPCuH"
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <Routess />
    </Provider>
  </Auth0Provider>,
  // </React.StrictMode>
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
