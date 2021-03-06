const consts = require("./const");
const map = require("./maps/maps");

class Player {
  constructor(socketId, name) {
    this.socketId = socketId;
    this.name = name;
    // GAME INFO
    this.map;
    this.lineCleared;
    this.level;
    this.score;
    this.isOver;
    this.moveQueue;
    this.moveHistory;
    this.startDate;
    this.b2bClear;
    this.needsUpdate;
    this.lastLineCleared;
    // PIECE INFO
    this.currentPiece;
    this.currentPieceRotation;
    this.currentPieceY;
    this.currentPieceX;
    this.currentSpecterY;
    this.needNewPiece;
    // PIECE HOLD
    this.pieceHold;
    this.hasHeld;
    this.lastIndex;
    // GRAVITY
    this.gravityInterval;
    this.init()
  }

  init() {
    // GAME INFO
    this.map = JSON.parse(JSON.stringify(map.empty));
    this.lineCleared = 0;
    this.level = 0;
    this.score = 0;
    this.isOver = false;
    this.moveQueue = [];
    this.moveHistory = [];
    this.startDate = null;
    this.b2bClear = false;
    this.needsUpdate = false;
    this.lastLineCleared = 0;
    // PIECE INFO
    this.currentPiece = 0;
    this.currentPieceRotation = 0;
    this.currentPieceY = 0;
    this.currentPieceX = 3;
    this.currentSpecterY = 0;
    this.needNewPiece = true;
    // PIECE HOLD
    this.pieceHold = -1;
    this.hasHeld = false;
    this.lastIndex = -1;
    // GRAVITY
    this.gravityInterval = 0;
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

    // Reset hold
    // If a piece held was swapped, then I need to put
    // current piece to lastIndex + 1 to get the actual next
    // piece
    if (this.hasHeld) {
      console.log("Has held !!");
      this.hasHeld = false;
      if (this.lastIndex >= 0)
        this.currentPiece = this.lastIndex;
      this.lastIndex = -1;
    }
  }

  increaseLevel() {
    if (this.level + 1 == consts.levels.length)
      return;

    this.level += 1;
    this.gravityInterval = consts.levels[this.level - 1];
  }
}

module.exports = Player;
