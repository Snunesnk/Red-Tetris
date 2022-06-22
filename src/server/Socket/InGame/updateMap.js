function updateMap(game, player, socket) {
  // Get the three next pieces
  let nextPieces = [];

  for (i = 1; i < 4; i++) {
    const pieceContent = game.pieces[player.currentPiece + i].content[0];
    for (j = 0; j < pieceContent.length; j++) {
      nextPieces.push(pieceContent[j]);
    }
  }

  socket.emit("ingame:updateMap", {
    map: player.map,
    score: player.score,
    level: player.level,
    nextPieces: nextPieces
  });
}

module.exports = updateMap;
