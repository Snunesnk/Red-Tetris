import socket from "../socket";

export function emitCreateGame(gameName, playerName) {
  socket.emit("game:create", { gameName, playerName });
}

export function onGameCreated(dispatch, payload) {
  if (payload.error)
    console.log(payload.error);
}
