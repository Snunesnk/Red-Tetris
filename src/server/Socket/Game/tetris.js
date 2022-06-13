const { tetris } = require("../../tetris");
const { Games } = require("../../const");

function startTetris(payload, socket) {
    console.log("server hit => game:startTetris");
    console.log(payload);
    const gameFound = Games.find((game) => game.name === payload.gameName ? true : false);

    const playerFound = gameFound.players.find(function (player) {
        if (player.name == payload.playerName) return true;
    });

    playerFound.setStartDate();

    tetris(gameFound, playerFound, socket);
}

module.exports = { startTetris };