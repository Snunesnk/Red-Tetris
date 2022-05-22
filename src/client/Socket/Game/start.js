import socket from "../socket";

export function emitStartGame(gameName) {
  socket.emit("game:start", { gameName });
}

export function onGameStarted(dispatch, payload) {
  // error: payload null if gameName is already taken
  console.log("client hit -> game:started");
  if (payload) {
    console.log(payload.gameName);
    dispatch({ type: "state:gameStarted" }, payload);
  }
  else
    console.log("error");
}
