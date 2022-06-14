import socket from "../socket";

export function emitJoinGame(gameName, playerName) {
  socket.emit("game:join", { gameName, playerName });
}

export function onGameJoined(dispatch, payload) {
  console.log("client hit -> game:joined");

  if (!payload.error)
    dispatch({ type: "state:roomSelected", roomName: payload.game.name });
  else console.log(payload.error);
}
