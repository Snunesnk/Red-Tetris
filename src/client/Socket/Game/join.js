import { useDispatch } from "react-redux";
import socket from "../socket";

const dispatch = useDispatch();

export function emitJoinGame(gameName, playerName) {
  socket.emit("game:join", { gameName, playerName });
}

export function onGameJoined(payload) {
  // error: payload null if playerName is already taked
  console.log("hit -> game:joined");
  if (payload) {
    console.log(payload.playerName);
    dispatch({type: "state:roomSelected"});
  }
  else
    console.log("error");
}
