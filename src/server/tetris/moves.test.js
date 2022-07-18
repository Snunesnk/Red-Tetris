import {
    moveLeft,
    moveRight,
    rotateRight,
    rotateLeft,
    putPieceDown,
    hold
} from "./moves";
import Player from "../player";
import Piece from "../piece";
import Game from "../game";
import Maps from "../maps/maps";
import { pieceList } from "../const";


/// LEFT MOVE ///
test("Move to left border", () => {
    let player = new Player();
    let piece = new Piece().content[0];
    let startX = player.currentPieceX;

    // Move the piece to the left border
    for (startX; startX > 0; startX--) {
        moveLeft(player, piece);
        expect(player.currentPieceX).toBeLessThan(startX);
    }
});
test("Try to cross left border", () => {
    let player = new Player();
    let piece = new Piece();
    let startX = player.currentPieceX;

    // Move the piece to the left border
    for (startX; startX > 0; startX--) {
        moveLeft(player, piece.content[0]);
    }

    // Left border hit, the piece must not go left further
    moveLeft(player, piece.content[0]);
    // There is an empty column at start of piece 3, 
    // so currentX will be -1 instead of 0
    if (piece.type === 3)
        expect(player.currentPieceX).toBe(-1);
    else
        expect(player.currentPieceX).toBe(0);
});
test("Try to move to an occupied space", () => {
    let player = new Player();
    let piece = new Piece().content[0];
    let startX = player.currentPieceX;

    // Set a map that forbid all movements
    player.loadMap(Maps.full)

    moveLeft(player, piece);
    expect(player.currentPieceX).toBe(startX);
});


/// RIGHT MOVE ///
test("Move to right border", () => {
    let player = new Player();
    // Test with all kind of pieces
    for (let i = 0; i < pieceList.length; i++) {
        let piece = new Piece().setType(i);
        let startX = player.currentPieceX;
        let offset = 0;

        // Depending on the type of the piece, 
        // startX will be between 2 and 4 more than currentX
        // I piece
        if (piece.type === 0)
            offset = 4;
        // O piece
        else if (piece.type === 3)
            offset = 2;
        else
            offset = 3;

        // Move the piece to the left border
        for (startX; startX < Maps.empty[0].length - 1 - offset; startX++) {
            moveRight(player, piece.content[0]);
            expect(player.currentPieceX).toBeGreaterThan(startX);
        }
    }
});
test("Try to cross right border", () => {
    let player = new Player();
    // Test with all kind of pieces
    for (let i = 0; i < pieceList.length; i++) {
        let piece = new Piece().setType(i);
        let startX = player.currentPieceX;

        // Depending on the type of the piece, 
        // the final X will be between 2 and 4 cases
        // from the right border
        let offset = 0;
        // I piece
        if (piece.type === 0)
            offset = 4;
        // O piece
        else if (piece.type === 3) {
            offset = 2;
        }
        else
            offset = 3;

        player.currentPieceX = Maps.empty.length - 1 - offset;
        moveRight(player, piece.content[0]);

        expect(player.currentPieceX).toBe(Maps.empty.length - 1 - offset);
    }
});
test("Try to move to an occupied space", () => {
    let player = new Player();
    let piece = new Piece().content[0];
    let startX = player.currentPieceX;

    // Set a map that forbid all movements
    player.loadMap(Maps.full)

    moveRight(player, piece);
    expect(player.currentPieceX).toBe(startX);
});


// /// LEFT ROTATION ///
test("Authorized left rotation in one try", () => {
    let player = new Player();
    let piece = new Piece().content[0];
    let game = new Game();
});
test("Authorized left rotation in several tries", () => {
    let player = new Player();
    let piece = new Piece().content[0];
});
test("Unauthorized left rotation", () => {

});
test("Left rotation on the left border", () => {

});