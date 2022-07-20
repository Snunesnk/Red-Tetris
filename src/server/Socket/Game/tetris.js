const { tetris } = require("../../tetris/tetris");
const { findGameBySocketIdPlayer } = require("../../games");
const { Games } = require("../../const");
const { findPlayer } = require("../../players");

function startTetris(socket) {
    const game = findGameBySocketIdPlayer(socket.id);
    const player = findPlayer(game, socket.id);
    player.setStartDate(); // TODO: move startDate to game instead of player
    tetris(game, player, socket);
}

module.exports = { startTetris };
