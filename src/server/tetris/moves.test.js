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
        const res = moveLeft(player, piece);
        expect(player.currentPieceX).toBeLessThan(startX);
        expect(res).toBe(1);
    }
});
test("Try to cross left border", () => {
    let player = new Player();
    let piece = new Piece();

    // Move the piece to the left border
    while (moveLeft(player, piece.content[0]) > 0);

    // Left border hit, the piece must not go left further
    const res = moveLeft(player, piece.content[0]);
    // There is an empty column at start of piece 3, 
    // so currentX will be -1 instead of 0
    if (piece.type === 3)
        expect(player.currentPieceX).toBe(-1);
    else
        expect(player.currentPieceX).toBe(0);
    expect(res).toBe(-1);
});
test("Try to move to an occupied space", () => {
    let player = new Player();
    let piece = new Piece().content[0];
    let startX = player.currentPieceX;

    // Set a map that forbid all movements
    player.loadMap(Maps.full)

    const res = moveLeft(player, piece);
    expect(player.currentPieceX).toBe(startX);
    expect(res).toBe(-1);
});


/// RIGHT MOVE ///
test("Move to right border", () => {
    let player = new Player();
    let res = 0;
    let moves = 0;
    const startX = player.currentPieceX;

    // Test with all kind of pieces
    for (let i = 0; i < pieceList.length; i++) {
        let piece = new Piece().setType(i);

        while (res > -1) {
            res = moveRight(player, piece.content[0]);
            if (res === -1)
                break;
            expect(player.currentPieceX).toBeGreaterThan(startX + moves);
            moves++
        }

        // Every piece can at least shift 3 cases right before hitting the border
        expect(moves).toBeGreaterThan(2);
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
        const res = moveRight(player, piece.content[0]);

        expect(player.currentPieceX).toBe(Maps.empty.length - 1 - offset);
        expect(res).toBe(-1);
    }
});
test("Try to move to an occupied space", () => {
    let player = new Player();
    let piece = new Piece().content[0];
    let startX = player.currentPieceX;

    // Set a map that forbid all movements
    player.loadMap(Maps.full)

    const res = moveRight(player, piece);
    expect(player.currentPieceX).toBe(startX);
    expect(res).toBe(-1);
});


// /// LEFT ROTATION ///
test("Authorized left rotation in one try", () => {
    let player = new Player();
    let piece = new Piece();

    // Get a non I-piece, because its rotation is special
    while (piece.type === 0)
        piece = new Piece();
    // Do a flip with the piece
    for (let i = 0; i < 4; i++) {
        const tries = rotateLeft(player, piece, 0);
        expect(player.currentPieceRotation).toBe(3 - i);
        expect(tries).toBe(0);
    }

    // Force test with I piece
    piece = new Piece().setType(0);
    // Do a flip with the piece
    for (let i = 0; i < 4; i++) {
        const tries = rotateLeft(player, piece, 0);
        expect(player.currentPieceRotation).toBe(3 - i);
        expect(tries).toBe(0);
    }
});
test("Authorized left rotation in several tries", () => {
    let player = new Player();
    let piece = new Piece();
    player.loadMap(Maps.forceRotationTries);

    // Get a non O-piece, because it can rotate everywhere
    // it fits
    while (piece.type === 3)
        piece = new Piece();

    const tries = rotateLeft(player, piece, 0);
    expect(player.currentPieceRotation).toBe(3);
    expect(tries).toBeGreaterThan(0);
});
test("Unauthorized left rotation", () => {
    let player = new Player();
    player.loadMap(Maps.full);

    for (let i = 0; i < pieceList.length; i++) {
        let piece = new Piece().setType(i);

        const tries = rotateLeft(player, piece, 0);
        expect(player.currentPieceRotation).toBe(0);
        expect(tries).toBe(-1);
    }
});
test("Left rotation on the left border", () => {
    let player = new Player();

    for (let i = 0; i < pieceList.length; i++) {
        let piece = new Piece().setType(i);
        let res = 0;

        // Move piece to the border
        while (res > -1) {
            res = moveLeft(player, piece.content[0]);
        }

        const pieceX = player.currentPieceX;
        rotateLeft(player, piece, 0);

        expect(player.currentPieceX).toBeGreaterThanOrEqual(pieceX);
    }
});