const { Games } = require("./const");

function findPlayer(game, socketId) {
  return game.players.find((player) => {
    if (player.socketId === socketId) return true;
  });
}

module.exports = { findPlayer };
