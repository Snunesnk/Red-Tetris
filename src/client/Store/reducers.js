import { combineReducers, createNextState } from "@reduxjs/toolkit";
import { emitMoveInGame } from "../Socket/InGame/move";
import { emitJoinGame } from "../Socket/Game/join";
import { emitCreateGame } from "../Socket/Game/create";
import { emitStartGame } from "../Socket/Game/start";
import { emitStartTetris } from "../Socket/Game/tetris";
import { DEFAULT_MAP } from "../constants";
import { emitListGames } from "../Socket/Game/list";

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
        case "game:list":
            emitListGames();
            return state;
        default:
            return state;
    }
}

const defaultBoard = {
    board: JSON.parse(JSON.stringify(DEFAULT_MAP)),
    score: 0,
    level: 0,
}
function stateBoard(state = defaultBoard, action) {
    switch (action.type) {
        case "map:new":
            return {
                ...state,
                board: action.map,
                score: action.score,
                level: action.level
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
    playerName: "",
    roomName: "",
    roomList: [],
    room: null,
};
function appState(state = defaultAppState, action) {
    switch (action.type) {
        case "state:pseudoEntered":
            // If there' a destination room, then tells the server
            // So th player can be redirected to the correct game
            if (action.destRoom !== "") {
                emitJoinGame(action.destRoom, action.playerName);
            }

            return {
                ...state,
                isPseudoEntered: true,
                playerName: action.playerName,
            };

        case "state:roomSelected":
            return {
                ...state,
                isRoomSelected: true,
                roomName: action.room.name, // TODO: remove it and use selectedRoom.name instead
                room: action.room,
            };

        case "state:gameStarted":
            return {
                ...state,
                isGameStarted: true,
            };

        case "state:gameOver":
            return {
                ...state,
                isGameOver: true,
            };

        case "state:gameEdited":
            return {
                ...state,
                room: action.room,
            };
        case "state:gamesListed":
            if (state.roomList.toString() !== action.roomList.toString()) {
                return {
                    ...state,
                    roomList: action.roomList,
                };
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
