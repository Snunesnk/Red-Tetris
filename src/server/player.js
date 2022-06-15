const consts = require("./const");
const map = require("./maps/maps");

class Player {
  constructor(socketId, name) {
    this.socketId = socketId;
    this.name = name;
    this.map = map.empty;
    this.currentPiece = 0;
    this.currentPieceRotation = 0;
    this.currentPieceY = 0;
    this.currentPieceX = 3;
    this.currentSpecterY = 0;
    this.lineCleared = 0;
    this.level = 0;
    this.isOver = false;
    this.moveQueue = [];
    this.gravityInterval;
    this.gravityApply = false;
    this.needNewPiece = true;
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

    // Init new coordinates to draw the piece
    this.currentPieceX = 3;
    this.currentPieceY = 0;
    this.currentSpecterY = 0;
  }

  increaseLevel() {
    if (this.level < consts.levels.length - 1) {
      this.level++;
    }

    this.resetGravityInterval();
  }

  resetGravityInterval() {
    if (this.gravityInterval)
      clearInterval(this.gravityInterval);

    this.gravityInterval = setInterval(() => {
      this.gravityApply = true;
    }, consts.levels[this.level]);

  }
}

module.exports = Player;
