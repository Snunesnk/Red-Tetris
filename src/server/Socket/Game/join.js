const { Games } = require("../../const");
const Player = require("../../player");

function joinGame(payload, socket) {
  console.log("hit => game:join");
  console.log(payload);
  const gameFound = Games.find(function (game) {
    if (game.name === payload.gameName) return true;
  });
  if (gameFound) {
    const playerFound = gameFound.players.find(function (player) {
      if (player.name == payload.playerName) return true;
    });
    if (!playerFound) {
      gameFound.players.push(new Player(socket.id, payload.playerName));
      socket.emit("game:joined", {
        gameName: payload.gameName,
        playerName: payload.playerName,
        game: gameFound,
      });
      return;
    }
  }
  socket.emit("game:joined");
}

module.exports = joinGame;
