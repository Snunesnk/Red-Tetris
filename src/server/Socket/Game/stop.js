const { Games } = require("../../const");
const listGames = require("./list");

function stopGame(payload, socket, io) {
  console.log("stopGame");
  const { playerName } = payload;
  const game = Games.find((g) => {
    return g.players.find((p) => p.name === playerName) ? true : false;
  });
  game.players.forEach((p) => {
    p.isOver = true;
  });

  socket.emit("game:over", {});
}

module.exports = stopGame;
