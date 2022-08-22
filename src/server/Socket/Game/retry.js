const { STATUS } = require("../../const");
const { findGameBySocketIdPlayer } = require("../../games");
const { findPlayer } = require("../../players");
const editGame = require("./edit");

function retryGame(socket, io) {
  console.log("server hit => game:retry");
  const game = findGameBySocketIdPlayer(socket.id);
  if (game) {
    const player = findPlayer(game, socket.id);
    if (player && game.players.indexOf(player) === 0) {
        game.reset(STATUS.WAITING_ROOM);
        editGame(game, io);
    }
  }
}

module.exports = retryGame;
