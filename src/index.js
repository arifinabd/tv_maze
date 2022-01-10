import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import Routess from "./Routess";
import "semantic-ui-css/semantic.min.css";

import { createStore } from "redux";
import { Provider } from "react-redux";

const stateFilm = {
  tes: "coba redux",
};

const reducerFilm = (state = stateFilm) => {
  return state;
};

const store = createStore(reducerFilm);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routess />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
