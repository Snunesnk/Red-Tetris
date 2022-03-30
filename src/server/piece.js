const pieceList = require("./const");

class Piece {
  constructor() {
    this.content = pieceList[Math.floor(Math.random() * pieceList.length)];
    this.rotate(Math.floor(Math.random() * 4));
  }

  rotate(rotations) {
    if (!rotations) {
      return;
    } else {
      let newArray = [];
      let i = 0;

      while (i < this.content.length) {
        let j = 0;

        newArray.push([]);
        while (j < this.content.length) {
          newArray[i].push(this.content[j][this.content.length - i - 1]);
          j++;
        }
        i++;
      }
      this.content = newArray;
      this.rotate(rotations - 1);
    }
  }
}

module.exports = Piece;
