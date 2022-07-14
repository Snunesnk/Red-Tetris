function updateMap(game, player, socket) {
  // Get the three next pieces
  let nextPieces = [];
  const index = player.lastIndex >= 0 ? player.lastIndex - 1 : player.currentPiece;

  for (i = 1; i < 4; i++) {
    const pieceContent = game.pieces[index + i].content[0];
    for (j = 0; j < pieceContent.length; j++) {
      nextPieces.push(pieceContent[j]);
    }
  }

  // The last line is always an empty line, so move it to the top
  // for better proportions
  nextPieces.unshift(nextPieces.splice(nextPieces.length - 1, 1)[0]);

  // Show held piece
  let pieceHold = [];
  if (player.pieceHold === -1) {
    for (j = 0; j < 4; j++) {
      pieceHold.push([0, 0, 0, 0]);
    }
  }
  else {
    const pieceContent = game.pieces[player.pieceHold].content[0];
    for (j = 0; j < pieceContent.length; j++) {
      pieceHold.push(pieceContent[j]);
    }
  }

  socket.emit("ingame:updateMap", {
    map: player.map,
    score: player.score,
    level: player.level,
    nextPieces: nextPieces,
    pieceHold: pieceHold
  });
}

module.exports = updateMap;
