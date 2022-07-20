const { formatGamesForClient } = require("../../games");

function listGames(socket, io) {
  if (socket) socket.emit("game:listed", { gameList: formatGamesForClient() });
  else if (io) io.emit("game:listed", { gameList: formatGamesForClient() });
}

module.exports = listGames;
