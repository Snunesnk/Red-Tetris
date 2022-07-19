const { findGameBySocketIdPlayer } = require("../../games");
const { findPlayer } = require("../../players");
const editGame = require("./edit");

function kickPlayer(payload, socket, io) {
  console.log("server hit => game:kickPlayer");
  const game = findGameBySocketIdPlayer(socket.id);
  if (game) {
    const player = findPlayer(game, socket.id);
    const targetPlayer = findPlayer(game, payload.playerId);
    if (player && targetPlayer && game.players.indexOf(player) === 0) {
      game.players.splice(game.players.indexOf(targetPlayer), 1);
      editGame(game, socket, io);
    }
  }
}

module.exports = kickPlayer;
