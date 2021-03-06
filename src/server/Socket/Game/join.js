const { STATUS } = require("../../const");
const { findGameByName, formatGameForClient } = require("../../games");
const editGame = require("./edit");

function joinGame(payload, socket, io) {
  console.log("server hit => game:join");
  console.log(payload);
  const game = findGameByName(payload.gameName);
  if (game) {
    if (game.status !== STATUS.WAITING_ROOM)
      socket.emit("game:joined", { error: "This game has already started" });
    else {
      let specters = [];
      // Get specter of all already existing players
      for (let i = 0; i < game.players.length; i++) {
        specters.push({
          id: game.players[i].socketId,
          map: game.players[i].map,
        });
      }

      game.addPlayer(payload.playerName, socket.id);
      socket.join(game.name);
      socket.emit("game:joined", { game: formatGameForClient(game), specters });
      editGame(game, io);
    }
  } else {
    console.log("game do not exist");
    socket.emit("game:joined", { error: "Do not exist" });
  }
}

module.exports = joinGame;
