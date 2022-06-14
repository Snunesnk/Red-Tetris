import socket from "../socket";

export function emitStartGame() {
  socket.emit("game:start");
}

export function onGameStarted(dispatch, payload) {
  console.log("client hit -> game:started");
  if (!payload.error) {
    dispatch({ type: "state:gameStarted" });
  }
  else
    console.log(payload.error);
}
