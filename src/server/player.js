const consts = require("./const");

class Player {
  constructor(socketId, name) {
    this.socketId = socketId;
    this.name = name;
    this.map = consts.defaultMap;
    this.currentPiece = 0;
    this.currentPieceRotation = 0;
    this.currentPieceY = -1;
    this.currentPieceX = -1;
    this.lineCleared = 0;
    this.level = 0;
    this.isOver = false;
    this.moveQueue = [];
    this.startDate;
  }

  setStartDate() {
    this.startDate = new Date().getDate();
  }

  addMove(move) {
    this.moveQueue.push(move);
  }
}

module.exports = Player;
