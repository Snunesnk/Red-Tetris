import socket from "../socket";

export function emitStartTetris() {
  socket.emit("game:tetrisStart");
}

export function onNewMap(dispatch, payload) {
  console.log("client hit -> game:newMap");

  if (!payload.error) {
    dispatch({ type: "map:new", map: payload.map });
  } else console.log(payload.error);
}

export function onGameOver(dispatch) {
  console.log("client hit => Game Over");

  dispatch({ type: "state:gameOver" });
}
