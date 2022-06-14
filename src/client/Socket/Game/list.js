import socket from "../socket";

export function emitListGames() {
  socket.emit("game:list");
}

export function onGamesListed(dispatch, payload) {
  console.log("client hit -> game:listed");
  
  
}
