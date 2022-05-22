function moveInGame(payload, socket) {
  console.log("server hit => inGame:move");
  console.log(payload);
  socket.emit("inGame:moved", { move: payload.move });
}

module.exports = moveInGame;
