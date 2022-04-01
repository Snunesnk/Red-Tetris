import { useDispatch } from "react-redux";
import socket from "../socket";

export function emitJoinGame(gameName, playerName) {
  socket.emit("game:join", { gameName, playerName });
}

export function onGameJoined(payload) {
  const dispatch = useDispatch();

  // error: payload null if playerName is already taked
  console.log("hit -> game:joined");
  if (payload) {
    console.log(payload.playerName);
    dispatch({type: "state:roomSelected"});
  }
  else
    console.log("error");
}
