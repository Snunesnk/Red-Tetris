const { Games } = require("../../const");

function listGames(socket) {
  console.log("server hit => game:list");
  socket.emit("game:listed", { gameList: Games });
  if (Games.length >= 1) console.log(Games[0].players);
}

module.exports = listGames;
