import socket from "../socket";

export function emitCreateGame(gameName, playerName) {
  socket.emit("game:create", { gameName, playerName });
}

export function onGameCreated(dispatch, payload) {
  // error: payload null if gameName is already taken
  console.log("client hit -> game:created");

  if (payload) {
    dispatch({ type: "state:roomSelected", roomName: payload.game.name });
  }
  else
    console.log("error");
}
