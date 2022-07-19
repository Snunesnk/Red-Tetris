const { Games } = require("../../const");
const Game = require("../../game");
const { findGameByName } = require("../../games");
const joinGame = require("./join");

function createGame(payload, socket, io) {
  console.log("server hit => game:create");
  console.log(payload);

  const found = findGameByName(payload.gameName);

  if (!found) {
    const newGame = new Game(payload.gameName);
    Games.push(newGame);

    socket.emit("game:created", {});
    joinGame(payload, socket, io);
  } else {
    console.log("gameName already taken");
    socket.emit("game:created", { error: "Name already taken" });
  }
}

module.exports = createGame;
