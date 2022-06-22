function editGame(game, socket) {
  socket.to(game.name).emit("game:edited", { game });
}

module.exports = editGame;
