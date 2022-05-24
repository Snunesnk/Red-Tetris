import socket from "../socket";
import { useSelector } from "react-redux";
import { useSelect } from "@mui/base";

const acceptedKeys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", " "];

export function emitMoveInGame(move) {
  if (acceptedKeys.indexOf(move) !== -1) {
    const state = useSelector(state => state.appState)
    socket.emit("inGame:move", { move: move, gameName: state.roomName, playerName: state.playerName });
  }
}

export function onInGameMoved(dispatch, payload) {
  // error: payload null if ...
  console.log("client hit -> inGame:moved");
  if (payload) console.log(payload.move);
  else console.log("error");
}
