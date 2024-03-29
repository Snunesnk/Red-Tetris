const { formatGameForClient } = require("../../games");
const { getSpecterMap } = require("../InGame/updateSpecter");

function editGame(game, io) {
  let specters = [];

  // Prepare specters of others players
  for (let i = 0; i < game.players.length; i++) {
    specters.push({
      id: game.players[i].socketId,
      map: getSpecterMap(game.players[i].map)
    });
  }

  io.to(game.name).emit("game:edited", { game: formatGameForClient(game), specters });
}

module.exports = editGame;
