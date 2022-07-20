import socket from "../socket";

export function emitHostPlayerGame(playerId) {
  socket.emit("game:hostPlayer", { playerId });
}
