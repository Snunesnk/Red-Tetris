import { applyMiddleware, combineReducers } from "@reduxjs/toolkit";
import { createStore } from '@reduxjs/toolkit';
import { DEFAULT_MAP } from "../constants";
import rootReducer from "./reducers";
import asyncFunctionMiddleware from "./middleware";


// const initialState = {
//   map: [...DEFAULT_MAP],
//   isGameStarted: false,
//   isPseudoEntered: false,
//   isRoomSelected: false,
//   pseudo: "",
//   roomName: ""
// }

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(asyncFunctionMiddleware)
);

export default store;