import socket from "../socket";

export function emitRetryGame() {
  socket.emit("game:retry");
}
