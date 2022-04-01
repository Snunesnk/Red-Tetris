import socket from "../socket";

export function emitCreateGame(gameName) {
  socket.emit("game:create", { gameName });
}

export function onGameCreated(payload) {
  // error: payload null if gameName is already taked
  console.log("hit -> game:created");
  if (payload) console.log(payload.gameName);
  else console.log("error");
}
