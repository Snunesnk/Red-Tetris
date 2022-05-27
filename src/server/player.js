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
    this.gravityInterval;
    this.gravityApply = false;
    this.startDate;
  }

  setStartDate() {
    this.startDate = new Date().getDate();
  }

  addMove(move) {
    this.moveQueue.push(move);
  }

  getNextPiece() {
    this.currentPiece += 1;
    this.currentPieceRotation = 0;
    this.currentPieceY = -1;
    this.currentPieceX = -1;
  }

  increaseLevel() {
    if (this.level < consts.levels.length - 1) {
      this.level++;
    }

    if (this.gravityInterval)
      clearInterval(this.gravityInterval);

    this.gravityInterval = setInterval(() => {
      this.gravityApply = true;
    }, consts.levels[this.level]);
  }
}

module.exports = Player;
