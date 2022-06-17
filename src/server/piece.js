const { pieceList } = require("./const");

class Piece {
  constructor() {
    this.type = Math.floor(Math.random() * 10 % pieceList.length);
    // this.type = 5;
    this.content = pieceList[this.type];
  }
}

module.exports = Piece;
