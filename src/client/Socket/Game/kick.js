import socket from "../socket";

export function emitKickPlayerGame(playerId) {
  console.log("client hit -> game:kick");
  socket.emit("game:kickPlayer", { playerId });
}
