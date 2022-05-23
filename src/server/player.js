const defaultMap = require("./const");

class Player {
  constructor(socketId, name) {
    this.socketId = socketId;
    this.name = name;
    this.map = defaultMap;
    this.currentPiece = 0;
    this.lineCleared = 0;
    this.level = 0;
    this.isOver = false;

    this.startDate;
  }
}

module.exports = Player;
