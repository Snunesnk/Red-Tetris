const { Games } = require("./const");

function findGameByName(name) {
  return Games.find((game) => {
    if (game.name === name) return true;
  });
}

function findGameBySocketIdPlayer(socketId) {
  return Games.find((game) => {
    if (
      game.players.find((player) => {
        if (player.socketId === socketId) return true;
      })
    )
      return true;
  });
}

module.exports = { findGameByName, findGameBySocketIdPlayer };
