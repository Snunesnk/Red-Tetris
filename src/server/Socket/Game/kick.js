const { findGameBySocketIdPlayer } = require("../../games");
const { findPlayer } = require("../../players");
const editGame = require("./edit");

function kickPlayer(payload, socket, io) {
  const game = findGameBySocketIdPlayer(socket.id);
  if (game) {
    const player = findPlayer(game, socket.id);
    const targetPlayer = findPlayer(game, payload.playerId);
    if (player && targetPlayer && game.players.indexOf(player) === 0) {
      const my_socket = io.sockets.sockets.get(payload.playerId);
      my_socket.leave(game.name);
      game.players.splice(game.players.indexOf(targetPlayer), 1);
      my_socket.emit("game:playerKicked");
      editGame(game, io);
    }
  }
}

module.exports = kickPlayer;
