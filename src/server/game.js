const { STATUS } = require("./const");
const Piece = require("./piece");
const Player = require("./player");

class Game {
  constructor(name, isPublic = true) {
    this.name = name; // game name
    this.pieces = []; // game complete piece List
    this.players = []; // game actual player list
    this.spectators = []; // game spectators
    this.isPublic = isPublic; // is this game public ? (available on homepage)
    this.status = STATUS.WAITING_ROOM;
    this.addPieces(10);
  }

  addPieces(nb) {
    for (let i = 0; i < nb; i++) {
      this.pieces.push(new Piece());
    }
  }

  addPlayer(playerName, socketId) {
    const newPlayer = new Player(socketId, playerName);
    this.players.push(newPlayer);
    return newPlayer;
  }

  reset(status) {
    this.pieces = [];
    this.status = status;
    this.addPieces(10);
    this.players.map((player) => player.init());
    if (status === STATUS.WAITING_ROOM)
      return; // just move everyone to waiting room
    else if (status === STATUS.IN_GAME) {
      return; // retry directly the game
    }
  }
}

module.exports = Game;