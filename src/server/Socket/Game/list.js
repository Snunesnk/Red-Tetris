const { Games } = require("../../const");

function listGames(socket) {
  console.log("server hit => game:list");
  socket.emit("game:listed", { gamesList: Games });
}

module.exports = listGames;
