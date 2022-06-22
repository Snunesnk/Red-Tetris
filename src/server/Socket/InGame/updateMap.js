function updateMap(game, player, socket) {
  // Get the three next pieces
  let nextPieces = [];

  for (i = 1; i < 4; i++) {
    const pieceContent = game.pieces[player.currentPiece + i].content[0];
    for (j = 0; j < pieceContent.length; j++) {
      nextPieces.push(pieceContent[j]);
    }
  }

  // The last line is always an empty line, so move it to the top
  // for better proportions
  // console.log(nextPieces.splice(nextPieces.length - 1, 1));
  nextPieces.unshift(nextPieces.splice(nextPieces.length - 1, 1)[0]);

  socket.emit("ingame:updateMap", {
    map: player.map,
    score: player.score,
    level: player.level,
    nextPieces: nextPieces
  });
}

module.exports = updateMap;
