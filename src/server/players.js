const { Games } = require("./const");
const Game = require("./game");
const { findGameBySocketIdPlayer } = require("./games");
const editGame = require("./Socket/Game/edit");
const listGames = require("./Socket/Game/list");

function findPlayer(game, socketId) {
  return game.players.find((player) => {
    if (player.socketId === socketId) return true;
  });
}

function deletePlayer(socket, io) {
  const game = findGameBySocketIdPlayer(socket.id);
  if (game) {
    const player = findPlayer(game, socket.id);
    game.players.splice(game.players.indexOf(player), 1);
    if (game.players.length < 1) {
      Games.splice(Games.indexOf(game), 1);
      listGames(null, io);
    }
    else
      editGame(game, io);
  }
}

module.exports = { findPlayer, deletePlayer };
