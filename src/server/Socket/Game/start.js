const { Games } = require("../../const");
const Player = require("../../player");
const tetris = require("../../tetris");

function startGame(payload, socket) {
  console.log("server hit => game:start");
  console.log(payload);
  const gameFound = Games.find((game) => game.name === payload.gameName ? true : false);

  if (gameFound) {
    const playerFound = gameFound.players.find(function (player) {
      if (player.name == payload.playerName) return true;
    });

    if (!playerFound) {
      console.log("No players found");
      gameFound.players.push(new Player(socket.id, payload.playerName));
    }
  }

  const new_payload = {
    gameName: payload.gameName,
    playerName: payload.playerName,
    game: { game: { ...gameFound, players: [] } },
  }

  socket.emit("game:started", new_payload);
}

function startTetris(payload, socket) {
  console.log("server hit => game:startTetris");
  console.log(payload);
  const gameFound = Games.find((game) => game.name === payload.gameName ? true : false);

  const playerFound = gameFound.players.find(function (player) {
    if (player.name == payload.playerName) return true;
  });

  playerFound.startDate = new Date().getDate();

  tetris(game, playerFound, socket);
}

module.exports = { startGame, startTetris };