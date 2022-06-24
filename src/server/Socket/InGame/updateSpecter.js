function updateSpecter(game, player, socket) {
  // Create the specter map.
  // For each column, find the highest piece, and then put everything under at 1
  let specterMap = JSON.parse(JSON.stringify(player.map));
  let highestFound = [];
  for (let i = 0; i < specterMap.length; i++) {
    for (let j = 0; j < specterMap[i].length; j++) {
      // If there's something, and the column's highest has not been found yet,
      // add this column to the highest found.
      // If it's 0 but the highest has been found, shift to a 1
      if (specterMap[i][j] != 0 && highestFound.indexOf(j) == -1) {
        highestFound.push(j);
      }
      else if (specterMap[i][j] == 0 && highestFound.indexOf(j) != -1)
        specterMap[i][j] = 1;
    }
  }

  socket
    .to(game.name)
    .emit("ingame:updateSpecter", {
      map: specterMap,
      index: player.socketId,
    });
}

module.exports = updateSpecter;
