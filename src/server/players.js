const { Games } = require("./const");
const { findGameBySocketIdPlayer } = require("./games");
const editGame = require("./Socket/Game/edit");

function findPlayer(game, socketId) {
  return game.players.find((player) => {
    if (player.socketId === socketId) return true;
  });
}

function deletePlayer(socket) {
  const game = findGameBySocketIdPlayer(socket.id);
  if (game) {
    const player = findPlayer(game, socket.id);
    if (player) {
      game.players.splice(game.players.indexOf(player), 1);
      editGame(game, socket)
    }
  }
}

module.exports = { findPlayer, deletePlayer };
