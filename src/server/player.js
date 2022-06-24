const consts = require("./const");
const map = require("./maps/maps");

class Player {
  constructor(socketId, name) {
    // ID
    this.socketId = socketId;
    this.name = name;

    // GAME INFO
    this.map = JSON.parse(JSON.stringify(map.empty));
    this.lineCleared = 0;
    this.level = 0;
    this.score = 0;
    this.isOver = false;
    this.moveQueue = [];
    this.moveHistory = [];
    this.startDate;
    this.b2bClear = false;

    // PIECE INFO
    this.currentPiece = 0;
    this.currentPieceRotation = 0;
    this.currentPieceY = 0;
    this.currentPieceX = 3;
    this.currentSpecterY = 0;
    this.needNewPiece = true;

    // GRAVITY
    this.gravityInterval;
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
    if (this.level + 1 == consts.levels.length)
      return;

    this.level += 1;
    this.gravityInterval = consts.levels[this.level - 1];
  }
}

module.exports = Player;
