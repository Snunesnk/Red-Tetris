function updateSpecter(game, player, socket) {
  socket
    .to(game.name)
    .emit("ingame:updateSpecter", {
      map: player.map,
      index: game.players.indexOf(player),
    });
}

module.exports = updateSpecter;
