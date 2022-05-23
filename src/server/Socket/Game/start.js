const { Games } = require("../../const");
const Player = require("../../player");

function startGame(payload, socket) {
  console.log("server hit => game:start");
  console.log(payload);
  const gameFound = Games.find((game) => game.name === payload.gameName ? true : false);

  if (gameFound) {
    const playerFound = gameFound.players.find(function (player) {
      if (player.name == payload.playerName) return true;
    });

    if (!playerFound) {
      gameFound.players.push(new Player(socket.id, payload.playerName));
    }
  }

  const new_payload = {
    gameName: payload.gameName,
    playerName: payload.playerName,
    game: gameFound,
  }
  console.log(new_payload);


  socket.emit("game:started", new_payload);
}

module.exports = startGame;
