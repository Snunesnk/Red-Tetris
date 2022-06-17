function updateMap(player, socket) {
  socket.emit("ingame:updateMap", {
    map: player.map,
    score: player.score,
    level: player.level,
  });
}

module.exports = updateMap;
