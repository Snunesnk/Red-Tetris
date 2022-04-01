import socket from "../socket";

export function emitListGames() {
  socket.emit("game:list");
}

export function onGamesListed(payload) {
  console.log("hit -> game:listed");
  if (payload) console.log(payload);
  else console.log(error);
}
