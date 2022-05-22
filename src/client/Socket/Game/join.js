import socket from "../socket";

export function emitJoinGame(gameName, playerName) {
  socket.emit("game:join", { gameName, playerName });
}

export function onGameJoined(dispatch, payload) {
  // error: payload null if playerName is already taked
  console.log("client hit -> game:joined");
  if (payload) {
    console.log(payload.playerName);
    dispatch({ type: "state:roomSelected", roomName: payload.gameName });
  }
  else
    console.log("error");
}
