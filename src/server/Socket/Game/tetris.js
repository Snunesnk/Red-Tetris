const { tetris } = require("../../tetris/tetris");
const { findGameBySocketIdPlayer } = require("../../games");
const { Games } = require("../../const");
const { findPlayer } = require("../../players");

function startTetris(payload, socket) {
    console.log("server hit => game:startTetris");
    console.log(payload);
    const game = findGameBySocketIdPlayer(socket.id);
    const player = findPlayer(game, socket.id);
    player.setStartDate();
    tetris(game, player, socket);
}

module.exports = { startTetris };