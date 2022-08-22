const { STATUS } = require("../../const");
const { findGameBySocketIdPlayer } = require("../../games");
const { findPlayer } = require("../../players");
const listGames = require("./list");

function startGame(socket, io) {
  const game = findGameBySocketIdPlayer(socket.id);
  if (game) {
    const player = findPlayer(game, socket.id);
    if (player && game.players.indexOf(player) === 0) {
      io.to(game.name).emit("game:started", {});
      game.status = STATUS.IN_GAME;
      listGames(null, io);
    } else
      socket.emit("game:started", {
        error: "Player do not exist or do not have permission",
      });
  } else socket.emit("game:started", { error: "Game name do not exist" });
}

module.exports = startGame;
