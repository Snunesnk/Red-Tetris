const { formatGamesForClient } = require("../../games");

function listGames(socket) {
  console.log("server hit => game:list");
  socket.emit("game:listed", { gameList: formatGamesForClient() });
}

module.exports = listGames;
