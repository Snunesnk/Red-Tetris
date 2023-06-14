import socket from "../socket";

export function emitTimeOver(playerName) {
  socket.emit("game:timeOver", { playerName });
}
