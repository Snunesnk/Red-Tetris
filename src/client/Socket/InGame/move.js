import socket from "../socket";

const acceptedKeys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", " ", "c"];

export function emitMoveInGame(move) {
  console.log("move: " + move);
  if (acceptedKeys.indexOf(move) !== -1) {
    socket.emit("inGame:move", {
      move: move,
    });
  }
}
