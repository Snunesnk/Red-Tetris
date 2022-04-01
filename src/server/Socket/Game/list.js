const { Games } = require("../../const");

function listGames(socket) {
  console.log("hit => game:list");
  socket.emit("game:listed", { gamesList: Games });
}

module.exports = listGames;