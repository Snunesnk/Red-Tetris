import socket from "../socket";

export function emitStartTetris() {
  socket.emit("game:tetrisStart");
}

export function onGameOver(dispatch) {
  dispatch({ type: "state:gameOver" });
}
