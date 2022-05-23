import socket from "../socket";

export function emitStartGame(gameName, playerName) {
  socket.emit("game:start", { gameName, playerName });
}

export function onGameStarted(dispatch, payload) {
  // error: payload null if gameName is already taken
  console.log("client hit -> game:started");
  if (payload) {
    console.log("payload");
    console.log(payload);
    dispatch({ type: "state:gameStarted" }, payload);
  }
  else
    console.log("error");
}
