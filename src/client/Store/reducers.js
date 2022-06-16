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

function roomName(state = "", action) {
    switch (action.type) {
        case "game:join":
            emitJoinGame(action.roomName, action.playerName);
            return state;

        case "game:create":
            emitCreateGame(action.roomName, action.playerName);
            return state;

        case "game:start":
            emitStartGame();
            return state;

        case "game:tetrisStart":
            emitStartTetris();
            return state;

        default:
            return state;
    }
}

const defaultBoard = {
    board: DEFAULT_MAP,
    score: "0"
}
function stateBoard(state = defaultBoard, action) {
    switch (action.type) {
        case "map:new":
            return {
                ...state,
                board: action.map,
                score: action.score
            }

        default:
            return state;
    }
}

const defaultAppState = {
    isGameStarted: false,
    isPseudoEntered: false,
    isRoomSelected: false,
    isGameOver: false,
    map: DEFAULT_MAP,
    playerName: "",
    roomName: "",
    score: "0",
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

        case "state:gameOver":
            return {
                ...state,
                isGameOver: true
            }

        case "state:newScore":
            return {
                ...state,
                score: action.score
            }

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    roomName,
    appState,
    move,
    stateBoard
});

export default rootReducer;