import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import "react-redux";
import reduxThunk from "redux-thunk";
import talk from "./talk";

export const reducers = {
  talk,
};

const reducer = combineReducers(reducers);
const store = configureStore({ reducer, middleware: [reduxThunk] });

export default store;
