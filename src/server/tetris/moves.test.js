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
import Maps from "../maps/maps";
import { pieceList } from "../const";


/// LEFT MOVE ///
describe("Left move", () => {
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
});


/// RIGHT MOVE ///
describe("Right move", () => {
    test("Move to right border", () => {
        // Test with all kind of pieces
        for (let i = 0; i < pieceList.length; i++) {
            let piece = new Piece().setType(i);
            let player = new Player();
            const startX = player.currentPieceX;
            let res = 0;
            let moves = 0;

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
        // Test with all kind of pieces
        for (let i = 0; i < pieceList.length; i++) {
            let piece = new Piece().setType(i);
            let player = new Player();

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
});


/// LEFT ROTATION ///
describe("Left rotation", () => {
    test("Authorized left rotation in one try", () => {
        let player = new Player();
        let piece = new Piece();

        // Put the piece in the middle of the board so it is not blocked
        player.currentPieceY = 10;

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
        for (let i = 0; i < pieceList.length; i++) {
            // Skip O-piece, because it can rotate everywhere it fits
            if (i === 3)
                continue;

            let piece = new Piece().setType(i);
            let player = new Player();
            player.loadMap(Maps.forceLeftRotationTries);

            const rot = player.currentPieceRotation;

            const tries = rotateLeft(player, piece, 0);
            expect(player.currentPieceRotation).not.toBe(rot);
            expect(tries).toBeGreaterThan(0);
        }
    });
    test("Unauthorized left rotation", () => {
        for (let i = 0; i < pieceList.length; i++) {
            let piece = new Piece().setType(i);
            let player = new Player();
            player.loadMap(Maps.full);

            const tries = rotateLeft(player, piece, 0);
            expect(player.currentPieceRotation).toBe(0);
            expect(tries).toBe(-1);
        }
    });
    test("Left rotation on the left border", () => {
        for (let i = 0; i < pieceList.length; i++) {
            let piece = new Piece().setType(i);
            let player = new Player();
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
});


/// RIGHT ROTATION ///
describe("Right rotation", () => {
    test("Authorized right rotation in one try", () => {
        let player = new Player();
        let piece = new Piece();

        // Put the piece in the middle of the board so it is not blocked
        player.currentPieceY = 10;

        // Get a non I-piece, because its rotation is special
        while (piece.type === 0)
            piece = new Piece();
        // Do a flip with the piece
        for (let i = 0; i < 4; i++) {
            const tries = rotateRight(player, piece, 0);
            expect(player.currentPieceRotation).toBe((i + 1) % 4);
            expect(tries).toBe(0);
        }

        // Force test with I piece
        piece = new Piece().setType(0);
        // Do a flip with the piece
        for (let i = 0; i < 4; i++) {
            const tries = rotateRight(player, piece, 0);
            expect(player.currentPieceRotation).toBe((i + 1) % 4);
            expect(tries).toBe(0);
        }
    });
    test("Authorized right rotation in several tries", () => {
        for (let i = 0; i < pieceList.length; i++) {
            let player = new Player();
            player.loadMap(Maps.forceRightRotationTries);

            // Skip O-piece, because it can rotate everywhere it fits
            if (i === 3)
                continue;

            let piece = new Piece().setType(i);

            const tries = rotateRight(player, piece, 0);
            expect(player.currentPieceRotation).not.toBe(0);
            expect(tries).toBeGreaterThan(0);
        }
    });
    test("Unauthorized right rotation", () => {
        for (let i = 0; i < pieceList.length; i++) {
            let piece = new Piece().setType(i);
            let player = new Player();
            player.loadMap(Maps.full);

            const tries = rotateRight(player, piece, 0);
            expect(player.currentPieceRotation).toBe(0);
            expect(tries).toBe(-1);
        }
    });
    test("Right rotation on the right border", () => {
        for (let i = 0; i < pieceList.length; i++) {
            let piece = new Piece().setType(i);
            let player = new Player();
            let res = 0;

            // Move piece to the border
            while (res > -1) {
                res = moveRight(player, piece.content[0]);
            }

            const pieceX = player.currentPieceX;
            rotateRight(player, piece, 0);

            expect(player.currentPieceX).toBeLessThanOrEqual(pieceX);
        }
    });
});


/// SPACE MOVE ///
describe("Space move", () => {
    test("Put pieces down without obstacles", () => {
        for (let i = 0; i < pieceList.length; i++) {
            let piece = new Piece().setType(i);
            let player = new Player();

            putPieceDown(player, piece.content[0]);

            expect(player.currentPieceY).toBeGreaterThan(player.map.length - piece.content[0].length);
            expect(player.needNewPiece).toBe(true);
        }
    });
    test("Put pieces down with obstacles", () => {
        for (let i = 0; i < pieceList.length; i++) {
            let piece = new Piece().setType(i);
            let player = new Player();
            player.loadMap(Maps.t_spin_double);

            putPieceDown(player, piece.content[0]);

            expect(player.currentPieceY).toBeGreaterThan(player.map.length - 2 - piece.content[0].length);
            expect(player.needNewPiece).toBe(true);
        }
    });
    test("Put pieces down out of the board to trigger game over", () => {
        for (let i = 0; i < pieceList.length; i++) {
            let piece = new Piece().setType(i);
            let player = new Player();
            // needNewPiece is true by defaults 
            player.needNewPiece = false;
            player.loadMap(Maps.full);

            // Put the piece above the board
            player.currentPieceY -= 2;

            putPieceDown(player, piece.content[0]);

            expect(player.isOver).toBe(true);
            expect(player.needNewPiece).toBe(false);
            expect(player.currentPieceY).toBeLessThan(0);
        }
    });
});


/// HOLD ///
describe("Hold", () => {
    test("Hold without previous held piece", () => {
        let player = new Player();

        hold(player);

        expect(player.currentPiece).toBeGreaterThan(0);
        expect(player.pieceHold).toBeGreaterThan(-1);
        expect(player.hasHeld).toBe(true);
        expect(player.lastIndex).toBe(-1);
    });
    test("Hold with previous held piece", () => {
        let player = new Player();

        hold(player);

        // Do as if the previous piece was put down
        player.getNextPiece();

        hold(player);

        expect(player.currentPiece).toBe(0);
        expect(player.pieceHold).toBeGreaterThan(-1);
        expect(player.hasHeld).toBe(true);
        expect(player.lastIndex).toBeGreaterThan(-1);
    });
    test("Try to hold twice in the same turn", () => {
        let player = new Player();

        hold(player);
        hold(player);

        // Cannot hold twice, so it should still nebe the second piece
        expect(player.currentPiece).toBe(1);
        expect(player.pieceHold).toBeGreaterThan(-1);
        expect(player.hasHeld).toBe(true);
        expect(player.lastIndex).toBe(-1);
    });
});