function updateSpecter(game, player, socket) {
  // Create the specter map.
  // For each column, find the first piece

  socket
    .to(game.name)
    .emit("ingame:updateSpecter", {
      map: player.map,
      index: player.socketId,
    });
}

module.exports = updateSpecter;
