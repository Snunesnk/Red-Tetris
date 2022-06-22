function updateSpecter(game, player, socket) {
  socket
    .to(game.name)
    .emit("ingame:updateSpecter", {
      map: player.map,
      index: player.socketId,
    });
}

module.exports = updateSpecter;
