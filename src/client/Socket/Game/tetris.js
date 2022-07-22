import socket from "../socket";

export function emitStartTetris() {
  socket.emit("game:tetrisStart");
}

export function onGameOver(dispatch) {
  console.log("client hit => Game Over");

  dispatch({ type: "state:gameOver" });
}

export function onGameWon(dispatch) {
  console.log("client hit => Game Won !");

  dispatch({ type: "state:gameWon" });
}
