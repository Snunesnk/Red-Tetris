import socket from "../socket";

export function emitCreateGame(gameName, playerName) {
  socket.emit("game:create", { gameName, playerName });
}

export function onGameCreated(dispatch, payload) {
  console.log("client hit -> game:created");

  if (!payload.error)
    dispatch({ type: "state:roomSelected", room: payload.game });
  else console.log(payload.error);
}
