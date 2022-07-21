import Player from "./player";
import Game from "./game";
import { STATUS } from "./const"


/// GAME ///
describe("Game class", () => {
    test("Create new game", () => {
        let game = new Game("MyClassGame");

        expect(game.name).toMatch("MyClassGame");
        expect(game.pieces.length).toBe(10);
        expect(game.players.length).toBe(0);
        expect(game.spectators.length).toBe(0);
        expect(game.isPublic).toBe(true);
    });
    test("Create non public game", () => {
        let game = new Game("MyPrivateClassGame", false);

        expect(game.name).toMatch("MyPrivateClassGame");
        expect(game.pieces.length).toBe(10);
        expect(game.players.length).toBe(0);
        expect(game.spectators.length).toBe(0);
        expect(game.isPublic).toBe(false);
    });
    test("Add pieces", () => {
        let game = new Game("MyGame");

        game.addPieces(15);

        expect(game.pieces.length).toBe(25);
    });
    test("Add players", () => {
        let game = new Game("MyGame");
        game.addPlayer("Michel", 1000);

        expect(game.players.length).toBe(1);
        expect(game.players[0].name).toMatch("Michel");
        expect(game.players[0].socketId).toBe(1000);
    });
    test("Reset game with status WAITING_ROOM", () => {
        let game = new Game("MyGame", false);

        game.addPieces(15);
        let michel = game.addPlayer("Michel", 1000);
        michel.level = 18;
        michel.score = 4200000;

        game.resetGame(STATUS.WAITING_ROOM);

        expect(game.pieces.length).toBe(0);
        expect(game.players.length).toBe(1);
        expect(game.status).toBe(STATUS.WAITING_ROOM);
        expect(game.spectators.length).toBe(0);
        expect(game.isPublic).toBe(false);
    });
    test("Reset game with status IN_GAME", () => {
        let game = new Game("MyGame", false);

        game.addPieces(15);
        let michel = game.addPlayer("Michel", 1000);
        michel.level = 18;
        michel.score = 4200000;

        game.resetGame(STATUS.IN_GAME);

        expect(game.pieces.length).toBe(0);
        expect(game.players.length).toBe(1);
        expect(game.status).toBe(STATUS.IN_GAME);
        expect(game.spectators.length).toBe(0);
        expect(game.isPublic).toBe(false);
    });
    test("Reset game with no status", () => {
        let game = new Game("MyGame", false);

        game.addPieces(15);
        let michel = game.addPlayer("Michel", 1000);
        michel.level = 18;
        michel.score = 4200000;

        game.resetGame("CC");

        expect(game.pieces.length).toBe(0);
        expect(game.players.length).toBe(1);
        expect(game.status).toBe("CC");
        expect(game.spectators.length).toBe(0);
        expect(game.isPublic).toBe(false);
    });
});


/// PLAYER ///
describe("Game class", () => {
    test("Add a move", () => {
        let player = new Player();

        player.addMove(" ");
        player.addMove("c");
        player.addMove("z");
        player.addMove("ArrowLeft");

        expect(player.moveQueue.length).toBe(4);
        expect(player.moveQueue).toMatchObject([" ", "c", "z", "ArrowLeft"]);
    });
    test("Get a previous held piece", () => {
        let player = new Player();

        player.hasHeld = true;
        player.lastIndex = 42;

        player.getNextPiece();

        expect(player.hasHeld).toBe(false);
        expect(player.lastIndex).toBe(-1);
        expect(player.currentPiece).toBe(42);
    });
    test("Try to go beyond max level", () => {
        let player = new Player();

        player.level = 42;

        player.increaseLevel();

        expect(player.level).toBeLessThan(42);
    });
});
