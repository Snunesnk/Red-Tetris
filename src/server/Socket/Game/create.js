function createGame(payload, socket) {
  console.log("hit => game:create");
  console.log(payload);
  socket.emit("game:created", { gameName: payload.gameName });
}

module.exports = createGame;
