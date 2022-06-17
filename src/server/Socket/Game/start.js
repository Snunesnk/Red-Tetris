const io = require("../..");
const { findGameBySocketIdPlayer } = require("../../games");
const { findPlayer } = require("../../players");

function startGame(socket, io) {
  console.log("server hit => game:start");
  const game = findGameBySocketIdPlayer(socket.id);
  if (game) {
    const player = findPlayer(game, socket.id);
    if (player && game.players.indexOf(player) === 0) {
      io.to(game.name).emit("game:started", {});
    } else
      socket.emit("game:started", {
        error: "Player do not exist or do not have permission",
      });
  } else socket.emit("game:started", { error: "Game name do not exist" });
}

module.exports = startGame;
