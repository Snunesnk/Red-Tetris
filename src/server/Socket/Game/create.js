const { Games } = require("../../const");
const Game = require("../../game");
const { findGameByName } = require("../../games");
const joinGame = require("./join");
const listGames = require("./list");

function createGame(payload, socket, io) {
  const found = findGameByName(payload.gameName);

  if (!found) {
    console.log("Game found")
    const newGame = new Game(payload.gameName);
    Games.push(newGame);

    listGames(null, io);
    socket.emit("game:created", {});
    joinGame(payload, socket, io);
  } else {
    console.log("gameName already taken");
    socket.emit("game:created", { error: "Name already taken" });
  }
}

module.exports = createGame;
