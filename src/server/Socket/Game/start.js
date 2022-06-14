const { findGameBySocketIdPlayer } = require("../../games");

function startGame(payload, socket) {
  console.log("server hit => game:start");
  console.log(payload);
  const game = findGameBySocketIdPlayer(socket.id);
  const new_payload = {
    gameName: payload.gameName,
    playerName: payload.playerName,
    game,
  };

  socket.emit("game:started", new_payload);
}

module.exports = startGame;
