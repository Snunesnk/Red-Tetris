import socket from "../socket";

export function emitStartTetris() {
  socket.emit("game:tetrisStart");
}

export function onGameOver(dispatch) {
  console.log("client hit => Game Over");

  dispatch({ type: "state:gameOver" });
}
