import socket from "../socket";
import { useSelector } from "react-redux";
import { useSelect } from "@mui/base";

const acceptedKeys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", " "];

export function emitMoveInGame(move, state) {
  if (acceptedKeys.indexOf(move) !== -1) {
    socket.emit("inGame:move", { move: move, gameName: state.roomName, playerName: state.playerName });
  }
}

export function onInGameMoved(payload) {
  // // error: payload null if ...
  // if (payload)
  //   console.log(payload.move);
  // else
  //   console.log("error");
}
