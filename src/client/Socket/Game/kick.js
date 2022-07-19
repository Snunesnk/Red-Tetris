import socket from "../socket";

export function emitKickPlayerGame(playerId) {
  socket.emit("game:kickPlayer", { playerId });
}

export function onPlayerKicked(dispatch, payload) {
  dispatch({ type: "state:kicked"});
}
