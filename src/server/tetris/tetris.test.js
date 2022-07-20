import Player from "../player";
import Game from "../game";
import Maps from "../maps/maps";
import { handleClearedLines, handleGame, handleGravity, handleMove, handleNewPiece, tetris } from "./tetris";
import Piece from "../piece";

// Create a fake socket that will store all calls
class FakeSocket {
    constructor() {
        this.msg = [];
        this.msgObj = [];
        this.dest = [];
        this.id = Math.floor(Math.random() * 100000000);
    }

    emit(msg, msgObj = null) {
        this.msg.push(msg);
        if (msgObj !== null)
            this.msgObj.push(msgObj)

        return this;
    }

    to(dest) {
        this.dest.push(dest);

        return this;
    }
}

jest.useFakeTimers();
afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

/// TETRIS ///
describe("Tetris loop", () => {
    test("One game loop", () => {
        let game = new Game();
        let fakeSocket = new FakeSocket();
        let player = new Player(fakeSocket.id, "Roger");

        tetris(game, player, fakeSocket);

        // wait for one frame before ending
        setTimeout(() => {
            player.isOver = true;
        }, 17);

        expect(fakeSocket.msg[0]).toMatch("ingame:updateMap");
        expect(fakeSocket.msgObj.length).toBe(1);
        expect(fakeSocket.msgObj[0]).toMatchObject({
            score: 0,
            level: 1
        });
        expect(player.map).not.toMatchObject(Maps.empty);
    });
    test("Instant game over", () => {
        let game = new Game();
        let fakeSocket = new FakeSocket();
        let player = new Player(fakeSocket.id, "Roger");

        player.isOver = true;

        tetris(game, player, fakeSocket);

        expect(fakeSocket.msg[0]).toMatch("game:over");
        expect(player.map).toMatchObject(Maps.empty)
    });
});


/// HANDLE GAME ///
describe("Tetris loop", () => {
    test("Update specters", () => {
        let game = new Game("MyGame");
        let fakeSocket = new FakeSocket();
        let player = new Player(fakeSocket.id, "Roger");

        player.needsUpdate = true;

        handleGame(game, player, fakeSocket);

        expect(fakeSocket.msg[0]).toMatch("ingame:updateSpecter");
        expect(fakeSocket.msgObj[0].index).toBe(player.socketId);
        expect(fakeSocket.dest).toContain(game.name);
    });
    test("Turn with nothing to do", () => {
        let game = new Game("MyGame");
        let fakeSocket = new FakeSocket();
        let player = new Player(fakeSocket.id, "Roger");

        player.needNewPiece = false;
        player.gravityInterval = new Date().getTime() + 30000;

        handleGame(game, player, fakeSocket);

        expect(fakeSocket.msg.length).toBe(0);
        expect(fakeSocket.msgObj.length).toBe(0);
        expect(fakeSocket.dest.length).toBe(0);
    });
    test("One Gravity", () => {
        let game = new Game();
        let fakeSocket = new FakeSocket();
        let player = new Player(fakeSocket.id, "Roger");

        player.gravityInterval = -300;

        handleGame(game, player, fakeSocket);

        expect(player.currentPieceY).toBe(1);
    });
    test("Erase previous piece", () => {
        let game = new Game();
        let fakeSocket = new FakeSocket();
        let player = new Player(fakeSocket.id, "Roger");

        player.needNewPiece = false;

        handleGame(game, player, fakeSocket);

        expect(player.currentPieceY).toBe(0);
    });
    test("Do a move", () => {
        let game = new Game();
        let fakeSocket = new FakeSocket();
        let player = new Player(fakeSocket.id, "Roger");
        const move = " ";

        player.moveQueue.push(move);

        handleGame(game, player, fakeSocket);

        expect(player.moveQueue.length).toBe(0);
        expect(player.moveHistory.length).toBe(1);
        expect(player.moveHistory[0]).toBe(move);
    });
    test("Add unbreakable line to other players", () => {
        let game = new Game();
        let fakeSocket = new FakeSocket();
        let player = new Player(fakeSocket.id, "Roger");

        const newPlayer = game.addPlayer("Marcel", 1000);
        const newPlayer2 = game.addPlayer("Pierre", 1001);
        player.lastLineCleared = 2;

        handleGame(game, player, fakeSocket);

        expect(player.needsUpdate).toBe(false);
        expect(newPlayer2.needsUpdate).toBe(true);
        expect(newPlayer2.needsUpdate).toBe(true);
    });
    test("Add new pieces to the game", () => {
        let game = new Game();
        let fakeSocket = new FakeSocket();
        let player = new Player(fakeSocket.id, "Roger");

        player.currentPiece = 2;

        handleGame(game, player, fakeSocket);

        expect(game.pieces.length).toBeGreaterThan(10);
    });
});


/// HANDLE NEW PIECE ///
describe("Handle new piece", () => {
    test("Try to add a piece in a full board", () => {
        let player = new Player(1000, "Roger");
        let piece = new Piece();

        player.loadMap(Maps.full);

        handleNewPiece(player, piece);

        expect(player.currentPieceY).toBeLessThan(0);
    });
});


/// HANDLE GRAVITY ///
describe("Handle gravity", () => {
    test("Gravity apply when piece is at bottom", () => {
        let player = new Player();
        let piece = new Piece();

        piece.setType(0);
        player.currentPieceY = 18;
        player.needNewPiece = false;

        handleGravity(player, piece);

        expect(player.needNewPiece).toBe(true);
    });
    test("Piece is outside the board", () => {
        let player = new Player();
        let piece = new Piece();

        piece.setType(0);
        player.currentPieceY = -2;
        player.needNewPiece = false;

        handleGravity(player, piece);

        expect(player.isOver).toBe(false);
        expect(player.currentPieceY).toBe(-1);
    });
    test("Piece is outside the board and can't go down", () => {
        let player = new Player();
        let piece = new Piece();

        piece.setType(0);
        player.currentPieceY = -2;
        player.needNewPiece = false;
        player.loadMap(Maps.full)

        handleGravity(player, piece);

        expect(player.isOver).toBe(true);
    });
    test("Piece is going to hit the bottom", () => {
        let player = new Player();
        let piece = new Piece();

        piece.setType(0);
        player.currentPieceY = 17;
        player.needNewPiece = false;

        handleGravity(player, piece);

        expect(player.needNewPiece).toBe(false);
        expect(player.currentPieceY).toBe(18);
        expect(player.gravityInterval).toBe(500);
    });
    test("Lock delay was set but is not needed anymore", () => {
        let player = new Player();
        let piece = new Piece();

        player.needNewPiece = false;
        player.gravityInterval = 500;

        handleGravity(player, piece);

        expect(player.needNewPiece).toBe(false);
        expect(player.gravityInterval).not.toBe(500);
    });
});


/// HANDLE MOVE ///
describe("Handle move", () => {
    test("Move left", () => {
        let player = new Player();
        let piece = new Piece();

        const startX = player.currentPieceX;

        handleMove(player, "ArrowLeft", piece);

        expect(player.currentPieceX).toBeLessThan(startX);
    });
    test("Move right", () => {
        let player = new Player();
        let piece = new Piece();

        const startX = player.currentPieceX;

        handleMove(player, "ArrowRight", piece);

        expect(player.currentPieceX).toBeGreaterThan(startX);
    });
    test("Move down", () => {
        let player = new Player();
        let piece = new Piece();

        const startY = player.currentPieceY;

        handleMove(player, "ArrowDown", piece);

        expect(player.currentPieceY).toBeGreaterThan(startY);
        expect(player.score).toBe(1);
    });
    test("Put down", () => {
        let player = new Player();
        let piece = new Piece();

        handleMove(player, " ", piece);

        expect(player.currentPieceY).toBeGreaterThan(15);
        expect(player.score).toBeGreaterThan(10);
    });
    test("Rotate right", () => {
        let player = new Player();
        let piece = new Piece();

        handleMove(player, "ArrowUp", piece);

        expect(player.currentPieceRotation).toBe(1);
    });
    test("Rotate left", () => {
        let player = new Player();
        let piece = new Piece();

        handleMove(player, "c", piece);

        expect(player.currentPieceRotation).toBe(3);
    });
    test("Hold", () => {
        let player = new Player();
        let piece = new Piece();

        handleMove(player, "z", piece);

        expect(player.hasHeld).toBe(true);
    });
    test("Non existant move", () => {
        let player = new Player();
        let piece = new Piece();

        handleMove(player, "Je n'existe pas", piece);

        let clonePlayer = new Player();
        expect(player).toMatchObject(clonePlayer);
    });
});


/// HANDLE CLEARED LINES ///
describe("Handle cleared lines", () => {
    test("No new piece", () => {
        let player = new Player();

        player.needNewPiece = false;

        handleClearedLines(player);

        let clonePlayer = new Player();
        clonePlayer.needNewPiece = false;
        expect(player).toMatchObject(clonePlayer);
    });

    test("Clear lines", () => {
        let player = new Player();
        let completedLines = 0;

        for (let i = 0; i < player.map.length; i++) {
            const rand = Math.random();

            if (rand >= 0.5) {
                for (let j = 0; j < player.map[i].length; j++) {
                    player.map[i][j] = 1;
                }
                completedLines += 1;
            }
        }

        const clearedLines = handleClearedLines(player);

        expect(clearedLines).toBe(completedLines);
    });

    test("Level increase", () => {
        let player = new Player();

        const startLevel = player.level;
        player.clearedLines = 10;

        handleClearedLines(player);

        expect(player.level).toBeGreaterThan(startLevel);
    });
});