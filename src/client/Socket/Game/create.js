import { useDispatch } from "react-redux";
import socket from "../socket";

const dispatch = useDispatch();

export function emitCreateGame(gameName) {
  socket.emit("game:create", { gameName });
}

export function onGameCreated(payload) {
  // error: payload null if gameName is already taked
  console.log("hit -> game:created");
  if (payload) {
    console.log(payload.gameName);
    dispatch({ type: "state:roomSelected" });
  }
  else
    console.log("error");
}
