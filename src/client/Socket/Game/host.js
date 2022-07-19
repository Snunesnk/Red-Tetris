import socket from "../socket";

export function emitHostPlayerGame(playerId) {
  console.log("client hit -> game:host");
  socket.emit("game:hostPlayer", { playerId });
}
