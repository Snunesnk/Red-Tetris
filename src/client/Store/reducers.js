import { combineReducers, createNextState } from "@reduxjs/toolkit";
import { emitMoveInGame } from "../Socket/InGame/move";
import { emitJoinGame } from "../Socket/Game/join";
import { emitCreateGame } from "../Socket/Game/create";
import { emitStartGame } from "../Socket/Game/start";
import { emitStartTetris } from "../Socket/Game/tetris";
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
    switch (action.type) {
        case "piece/move":
            return state;

        // case "incr/clicked":
        //     state[action.pos[1]][action.pos[0]] = state[action.pos[1]][action.pos[0]] % 7 + 1;
        //     return state

        case "piece/insert":
            return state;

        case "map:new":
            state = action.map;
            return state;

        default:
            return state;
    }
}

function roomName(state = "", action) {
    switch (action.type) {
        case "game:joined":
            emitJoinGame(action.roomName, action.playerName);
            return state;

        case "game:create":
            emitCreateGame(action.roomName, action.playerName);
            return state;

        case "game:start":
            emitStartGame(action.roomName, action.playerName);
            return state;

        case "game:tetrisStart":
            emitStartTetris(action.roomName, action.playerName);
            return state;

        default:
            return state;
    }
}

const defaultAppState = {
    isGameStarted: false,
    isPseudoEntered: false,
    isRoomSelected: false,
    playerName: "",
    roomName: ""
}
function appState(state = defaultAppState, action) {
    switch (action.type) {
        case "state:pseudoEntered":
            return {
                ...state,
                isPseudoEntered: true,
                playerName: action.playerName
            }

        case "state:roomSelected":
            return {
                ...state,
                isRoomSelected: true,
                roomName: action.roomName
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
    appState,
    move
});

export default rootReducer;