const { tetris } = require("../../tetris/tetris");
const { findGameBySocketIdPlayer } = require("../../games");
const { findPlayer } = require("../../players");

function startTetris(socket, io) {
  const game = findGameBySocketIdPlayer(socket.id);
  if (game) {
    const player = findPlayer(game, socket.id);
    tetris(game, player, socket, io);
  }
}

module.exports = { startTetris };
