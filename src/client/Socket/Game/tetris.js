import socket from "../socket";

export function emitStartTetris() {
  socket.emit("game:tetrisStart");
}

export function onNewMap(dispatch, payload) {
  if (!payload.error) {
    dispatch({ type: "map:new", map: payload.map, score: payload.score });
  } else console.log(payload.error);
}

export function onGameOver(dispatch) {
  console.log("client hit => Game Over");

  dispatch({ type: "state:gameOver" });
}
