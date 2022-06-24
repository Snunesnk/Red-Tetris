const Piece = require("./piece");
const Player = require("./player");

class Game {
  constructor(name, isPublic = true) {
    this.name = name; // game name
    this.pieces = []; // game complete piece List
    this.players = []; // game actual player list
    this.spectators = []; // game spectators
    this.isPublic = isPublic; // is this game public ? (available on homepage)
    this.status = 0;
    this.addPieces(10)
  }

  addPieces(nb) {
    for (let i = 0; i < nb; i++) {
      this.pieces.push(new Piece());
    }
  }

  addPlayer(playerName, socketId) {
    const newPlayer = new Player(socketId, playerName);
    this.players.push(newPlayer);
  }
}

module.exports = Game;