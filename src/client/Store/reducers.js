import { combineReducers, createNextState } from "@reduxjs/toolkit";
import { emitJoinGame } from "../Socket/Game/join";
import { emitCreateGame } from "../Socket/Game/create";
import { emitStartGame } from "../Socket/Game/start";
import { emitStartTetris } from "../Socket/Game/tetris";
import { DEFAULT_MAP, NEXT_PIECES, HOLD_PIECE } from "../constants";
import { emitListGames } from "../Socket/Game/list";
import { emitKickPlayerGame } from "../Socket/Game/kick";
import { emitHostPlayerGame } from "../Socket/Game/host";

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
    case "game:kickPlayer":
      emitKickPlayerGame(action.playerId);
      return state;
    case "game:hostPlayer":
      emitHostPlayerGame(action.playerId);
      return state;
    default:
      return state;
  }
}

const defaultBoard = {
  board: JSON.parse(JSON.stringify(DEFAULT_MAP)),
  nextPieces: JSON.parse(JSON.stringify(NEXT_PIECES)),
  pieceHold: JSON.parse(JSON.stringify(HOLD_PIECE)),
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
        level: action.level,
        nextPieces: action.nextPieces,
        pieceHold: action.pieceHold
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
  specters: [],
  socketId: null,
};
function appState(state = defaultAppState, action) {
  switch (action.type) {
    case "state:pseudoEntered":
      // If there's a destination room, then tells the server
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
        specters: action.specters,
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
      // If there's specters, remove the actual player's specter from list
      if (action.specters !== undefined) {
        action.specters = action.specters.filter(specter => specter.id != state.socketId);
      }
      return {
        ...state,
        ...action,
      };

    case "state:gamesListed":
      if (state.roomList.toString() !== action.roomList.toString()) {
        return {
          ...state,
          roomList: action.roomList,
        };
      }

    case "specters:new":
      for (let i = 0; i < state.specters.length; i++) {
        if (state.specters[i].id == action.index) {
          state.specters[i].map = action.map;
          break;
        }
      }
      return state;

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  roomName,
  appState,
  stateBoard,
});

export default rootReducer;
