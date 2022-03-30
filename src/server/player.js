const defaultMap = require("./const");

class Player {
  constructor(socketId, name) {
    this.socketId = socketId;
    this.name = name;
    this.map = defaultMap;
  }
}

module.exports = Player;
