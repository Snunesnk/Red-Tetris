const { Games } = require("../../const");
const Game = require("../../game");
const listGames = require("./list");
const crypto = require("crypto");

function startQuickGame(payload, socket, io) {
  const uuid = crypto.randomUUID();

  // Create and join a new game
  const newGame = new Game(uuid);
  newGame.isQuick = true;
  Games.push(newGame);
  listGames(null, io);
  newGame.addPlayer(payload.playerName, socket.id);
  socket.join(newGame.name);

  console.log("Game started");

  socket.emit("game:startedQuick", {});
}

module.exports = startQuickGame;
