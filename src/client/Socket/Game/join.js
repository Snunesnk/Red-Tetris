import socket from "../socket";

export function emitJoinGame(gameName, playerName) {
  socket.emit("game:join", { gameName, playerName });
}

export function onGameJoined(payload) {
  // error: payload null if playerName is already taked
  console.log("hit -> game:joined");
  if (payload) console.log(payload);
  else console.log("error");
}
