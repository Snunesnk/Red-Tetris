const { findGameByName } = require("../../games");

function joinGame(payload, socket) {
  console.log("server hit => game:join");
  console.log(payload);
  const game = findGameByName(payload.gameName);
  if (game) {
    game.addPlayer(payload.playerName, socket.id);
    socket.join(game.name);
    socket.emit("game:joined", { game });
    socket.to(game.name).emit("game:updated", { game });
  } else {
    console.log("game do not exist");
    socket.emit("game:joined", { error: "Do not exist" });
  }
}

module.exports = joinGame;
