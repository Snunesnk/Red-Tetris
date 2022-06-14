const { Games } = require("../../const");

function listGames(socket) {
  console.log("server hit => game:list");
  socket.emit("game:listed", { gameList: Games });
}

module.exports = listGames;
