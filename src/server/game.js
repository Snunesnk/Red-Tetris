const Piece = require("./piece");
const Player = require("./player");

class Game {
    constructor() {
        this.pieces = [];
        this.players = [];
        this.addPieces(20);
    }

    addPieces(nb) {
        for (let i = 0; i < nb; i++) {
            this.pieces.push(new Piece);
        }
    }
}

module.exports = Game;
