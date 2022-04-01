import { useDispatch } from "react-redux";
import socket from "../socket";

export function emitCreateGame(gameName) {
  socket.emit("game:create", { gameName });
}

export function onGameCreated(payload) {
  const dispatch = useDispatch();

  // error: payload null if gameName is already taked
  console.log("hit -> game:created");
  if (payload) {
    console.log(payload.gameName);
    dispatch({ type: "state:roomSelected" });
  }
  else
    console.log("error");
}
