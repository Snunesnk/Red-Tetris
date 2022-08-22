const { Games } = require("../../const");
const { findGameBySocketIdPlayer } = require("../../games");
const { findPlayer } = require("../../players");

function moveInGame(payload, socket) {
  const game = findGameBySocketIdPlayer(socket.id);
  if (game) {
    const player = findPlayer(game, socket.id);

    player.addMove(payload.move);
    socket.emit("inGame:moved", { move: payload.move });
  }
}

module.exports = moveInGame;
