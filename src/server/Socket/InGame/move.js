function moveInGame(payload, socket) {
  console.log("hit => inGame:move");
  console.log(payload);
  socket.emit("inGame:moved", { move: payload.move });
}

module.exports = moveInGame;
