const { Games } = require("../../const");
const Game = require("../../game");

function createGame(payload, socket) {
  console.log("server hit => game:create");
  console.log(payload);
  const found = Games.find(function (game) {
    if (game.name === payload.gameName) return true;
  });
  if (!found) {
    const newGame = new Game(payload.gameName);
    Games.push(newGame);
    socket.emit("game:created", { gameName: payload.gameName, game: newGame });
  } else socket.emit("game:created");
}

module.exports = createGame;
