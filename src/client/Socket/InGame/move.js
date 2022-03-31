const acceptedKeys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", " "];

export function emitMoveInGame(move, socket) {
  if (acceptedKeys.indexOf(move) !== -1) socket.emit("inGame:move", { move });
}

export function onInGameMoved(payload, socket) {
  // error: payload null if ...
  console.log("hit -> inGame:moved");
  if (payload) console.log(payload.move);
  else console.log("error");
}