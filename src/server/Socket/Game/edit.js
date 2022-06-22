function editGame(game, socket) {
  let specters = [];

  // Prepare specters of others players
  for (i = 0; i < game.players.length; i++) {
    specters.push({
      id: game.players[i].socketId,
      map: game.players[i].map
    });
  }

  socket.to(game.name).emit("game:edited", { game, specters });
}

module.exports = editGame;
