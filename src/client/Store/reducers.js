import { combineReducers } from "@reduxjs/toolkit";
import { emitMoveInGame } from "../Socket/InGame/move";
import { emitJoinGame } from "../Socket/Game/join";
import { emitCreateGame } from "../Socket/Game/create";
import { DEFAULT_MAP } from "../constants";

function move(state = {}, action) {
    switch (action.type) {
        case "inGame:move":
            emitMoveInGame(action.keyCode);
            return state;

        default:
            return state;
    }
}

function map(state = DEFAULT_MAP, action) {
    console.log(action);
    console.log(state);
    switch (action.type) {
        case "move/left":
            return state;

        case "incr/clicked":
            state[action.pos[1]][action.pos[0]] = state[action.pos[1]][action.pos[0]] % 7 + 1;

            return state

        default:
            return state;
    }
}

function roomName(state = "", action) {
    switch (action.type) {
        case "game:joined":
            emitJoinGame(action.roomName, action.playerName);

        case "game:create":
            emitCreateGame(action.roomName);

        default:
            return state;
    }
}

function playerName(state = "", action) {
    switch (action.type) {
        case "name:entered":
            state = action.playerName;
            return state;

        default:
            return state;
    }
}

const defaultAppState = {
    isGameStarted: false,
    isPseudoEntered: false,
    isRoomSelected: false,
}
function appState(state = defaultAppState, action) {
    switch (action.type) {
        case "state:pseudoEntered":
            return {
                ...state,
                isPseudoEntered: true
            }

        case "state:roomSelected":
            return {
                ...state,
                isRoomSelected: true
            }

        case "state:gameStarted":
            return {
                ...state,
                isGameStarted: true
            }

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    map,
    roomName,
    playerName,
    appState,
    move
});

export default rootReducer;