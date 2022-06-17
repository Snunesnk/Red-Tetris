import socket from "../socket";

const acceptedKeys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", " "];

export function emitMoveInGame(move, state) {
  if (acceptedKeys.indexOf(move) !== -1) {
    socket.emit("inGame:move", {
      move: move,
    });
  }
}
