const { Games } = require("../../const");
const Game = require("../../game");
const Player = require("../../player");

function createGame(payload, socket) {
  console.log("server hit => game:create");
  console.log(payload);

  const found = Games.find(function (game) {
    if (game.name === payload.gameName) return true;
  });

  if (!found) {
    console.log("No similar game found")
    let newGame = new Game(payload.gameName);
    // newGame.addPlayer(payload.playerName, socket.id);

    Games.push(newGame);

    socket.emit("game:created", { game: { ...newGame, players: [] } });
  }
  else
    socket.emit("game:created", { game: null });
}

module.exports = createGame;