export function emitJoinGame(gameName, playerName, socket) {
  socket.emit("game:join", { gameName, playerName });
}

export function onGameJoined(payload, socket) {
  // error: payload null if playerName is already taked
  console.log("hit -> game:joined");
  if (payload) console.log(payload.playerName);
  else console.log("error");
}
