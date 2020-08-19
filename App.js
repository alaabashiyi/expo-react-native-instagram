import React from "react";
import SwitchNavigator from "./navigation/SwitchNavigator";
import reducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
const middleware = applyMiddleware(thunkMiddleware, logger);
const store = createStore(reducer, middleware);
import firebase from "./config/firebase";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <SwitchNavigator />
      </Provider>
    );
  }
}
