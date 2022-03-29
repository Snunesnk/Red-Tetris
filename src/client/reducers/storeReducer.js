import { applyMiddleware, combineReducers } from "@reduxjs/toolkit";
import { createStore } from '@reduxjs/toolkit';
import { DEFAULT_MAP } from "../constants";
import mapReducer from "./mapReducer";
import asyncFunctionMiddleware from "./middleware";


// const storeReducer = combineReducers({
//   map: mapReducer
// });

const initialState = {
  map: [...DEFAULT_MAP]
}

const store = createStore(
  // storeReducer,
  mapReducer,
  initialState,
  applyMiddleware(asyncFunctionMiddleware)
);

export default store;