const { findGameBySocketIdPlayer } = require("../../games");
const { findPlayer } = require("../../players");
const editGame = require("./edit");

function hostPlayer(payload, socket, io) {
  const game = findGameBySocketIdPlayer(socket.id);
  if (game) {
    const player = findPlayer(game, socket.id);
    const targetPlayer = findPlayer(game, payload.playerId);
    if (player && targetPlayer && game.players.indexOf(player) === 0) {
      const tmp = player;
      const indexTarget = game.players.indexOf(targetPlayer);
      game.players[0] = targetPlayer;
      game.players[indexTarget] = tmp;
      editGame(game, io);
    }
  }
}

module.exports = hostPlayer;
