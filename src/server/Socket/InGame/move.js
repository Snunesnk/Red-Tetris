const { Games } = require("../../const");

function moveInGame(payload, socket) {
  console.log("server hit => inGame:move");
  console.log(payload);

  // Add the move to the player move queue
  const gameFound = Games.find((game) => game.name === payload.gameName ? true : false);

  const playerFound = gameFound.players.find(function (player) {
    if (player.name == payload.playerName) return true;
  });

  playerFound.addMove()

  socket.emit("inGame:moved", { move: payload.move });
}

module.exports = moveInGame;
