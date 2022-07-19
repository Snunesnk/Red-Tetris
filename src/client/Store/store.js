import { applyMiddleware, combineReducers } from "@reduxjs/toolkit";
import { createStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import asyncFunctionMiddleware from "./middleware";
import { initSockets } from "../Socket/socket";

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(asyncFunctionMiddleware)
);

initSockets(store.dispatch);

export default store;
