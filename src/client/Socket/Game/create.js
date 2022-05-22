import socket from "../socket";

export function emitCreateGame(gameName) {
  socket.emit("game:create", { gameName });
}

export function onGameCreated(dispatch, payload) {
  // error: payload null if gameName is already taken
  console.log("client hit -> game:created");
  if (payload) {
    console.log(payload.gameName);
    dispatch({ type: "state:roomSelected", roomName: payload.gameName });
  }
  else
    console.log("error");
}
