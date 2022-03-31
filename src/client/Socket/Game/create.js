export function emitCreateGame(gameName, socket) {
  socket.emit("game:create", { gameName });
}

export function onGameCreated(payload, socket) {
  // error: payload null if gameName is already taked
  console.log("hit -> game:created");
  if (payload) console.log(payload.gameName);
  else console.log("error");
}
