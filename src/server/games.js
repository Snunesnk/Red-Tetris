const { Games } = require("./const");

function findGameByName(name) {
  return Games.find((game) => {
    if (game.name === name) return true;
  });
}

function findGameBySocketIdPlayer(socketId) {
  return Games.find((game) => {
    let player = game.players.find((player) => {
      if (player.socketId === socketId) return true;
      return false;
    });
    if (player) return true;
    return false;
  });
}

function formatGameForClient(game) {
  return {
    name: game.name,
    isPublic: game.isPublic,
    status: game.status,
    players: game.players.map((player) => {
      return { name: player.name, socketId: player.socketId };
    }),
    spectators: game.spectators.map((spectator) => {
      return { name: spectator.name, socketId: spectator.socketId };
    }),
  };
}

function formatGamesForClient() {
  const games = [];
  Games.map((game) => {
    if (game.isQuick) return;
    games.push(formatGameForClient(game));
  });

  return games;
}

module.exports = {
  findGameByName,
  findGameBySocketIdPlayer,
  formatGameForClient,
  formatGamesForClient,
};
