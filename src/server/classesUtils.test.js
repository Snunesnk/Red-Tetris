import Player from "./player";
import Game from "./game";
import {
    findGameByName,
    findGameBySocketIdPlayer,
    formatGameForClient,
    formatGamesForClient
} from "./games";
import {
    findPlayer,
    deletePlayer,
} from "./players";
import { Games } from "./const";
import FakeSocket from "./Socket/socket.test";

let newGame = new Game("MyGame");
newGame.spectators.push(newGame.addPlayer("Roger", 1000));
let newPrivateGame = new Game("MyPrivateGame", true);
newPrivateGame.addPlayer("Marcel", 1001);
let newPublicGame = new Game("MyPublicGame", false);
newPublicGame.addPlayer("Michel", 1002);
Games.push(newGame, newPrivateGame, newPublicGame);

/// GAMES ///
describe("Games", () => {
    test("Find game by name", () => {
        const gameFound = findGameByName("MyPrivateGame");

        expect(gameFound.name).toMatch("MyPrivateGame")
    });
    test("Find game player's socket id", () => {
        const gameFound = findGameBySocketIdPlayer(1002);

        console.log(gameFound);

        expect(gameFound.name).toMatch("MyPublicGame")
    });
    test("Format a game to send to client", () => {
        const formattedGame = formatGameForClient(newGame);

        expect(formattedGame).toMatchObject({
            name: newGame.name,
            isPublic: newGame.isPublic,
            status: newGame.status,
            players: newGame.players.map(player => {
                return {
                    name: player.name,
                    socketId: player.socketId
                }
            }),
            spectators: newGame.spectators.map(spectator => {
                return {
                    name: spectator.name,
                    socketId: spectator.socketId
                }
            }),
        });
    });
    test("Format all games to send to client", () => {
        const formattedGames = formatGamesForClient();

        expect(formattedGames).toMatchObject([
            formatGameForClient(newGame),
            formatGameForClient(newPrivateGame),
            formatGameForClient(newPublicGame),
        ]);
    });
});


/// PLAYERS ///
describe("Players", () => {
    test("Find a player in a game", () => {
        const playerFound = findPlayer(newGame, 1000);

        expect(playerFound.name).toBe("Roger");
        expect(playerFound.socketId).toBe(1000);
    });
    test("Try to find a non existant player", () => {
        const playerFound = findPlayer(newGame, 1042);

        expect(playerFound).toBe(undefined);
    });
    test("Remove a player", () => {
        let socket = new FakeSocket();
        let io = new FakeSocket();
        socket.id = 1000;

        deletePlayer(socket, io);

        expect(newGame.players.length).toBe(0);
        expect(io.msg[0]).toMatch("game:edited");
    });
    test("Try to remove a non existant player", () => {
        let socket = new FakeSocket();
        let io = new FakeSocket();
        socket.id = 1042;

        deletePlayer(socket, io);

        expect(newGame.players.length).toBe(0);
        expect(io.msg.length).toBe(0);
    });
});