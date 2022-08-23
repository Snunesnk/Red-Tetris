import createGame from "./Game/create";
import { Games } from "../const";
import joinGame from "./Game/join";
import hostPlayer from "./Game/host";
import FakeSocket from "./socket.test";
import { findGameByName } from "../games";
import kickPlayer from "./Game/kick";
import startGame from "./Game/start";
import { startTetris } from "./Game/tetris";
import moveInGame from "./InGame/move";

/// GAME ///
describe("Game", () => {
  test("Create a game", () => {
    let socket = new FakeSocket();
    let io = new FakeSocket();
    const gameName = "rgergm";
    let payload = {
      gameName,
      playerName: "MyPlayer",
    };
    createGame(payload, socket, io);
    const game = findGameByName(gameName);
    expect(game.name).toMatch(gameName);
    expect(game.players[0].name).toMatch("MyPlayer");

    createGame(payload, socket, io);
    expect(socket.msg[2]).toMatch("game:created");
    expect(socket.msgObj[2].error).toMatch("Name already taken");
    Games.pop();
  });
  test("Join a non existing game", () => {
    let socket = new FakeSocket();
    let io = new FakeSocket();
    let payload = {
      gameName: "NonExistingGame",
      playerName: "MyPlayer",
    };

    joinGame(payload, socket, io);

    expect(socket.msg[0]).toMatch("game:joined");
    expect(socket.msgObj[0].error).toMatch("Do not exist");
  });

  test("Make a player host", () => {
    const gameName = "wegeg";
    let socket = new FakeSocket();
    let socket2 = new FakeSocket();
    let io = new FakeSocket();
    let payload = {
      playerId: socket2.id,
    };

    hostPlayer(payload, socket, io); // Test with unexisting game
    expect(socket.msg.length).toBe(0);

    payload = {
      gameName,
      playerName: "MyPlayer1",
    };
    createGame(payload, socket, io);
    payload = {
      playerId: socket2.id,
    };
    socket.msg = [];
    hostPlayer(payload, socket, io); // Test with user not found
    expect(socket.msg.length).toBe(0);

    payload = {
      gameName,
      playerName: "MyPlayer2",
    };
    joinGame(payload, socket2, io);
    let game = findGameByName(gameName);
    expect(game.players[0].name).toMatch("MyPlayer1");
    expect(game.players[1].name).toMatch("MyPlayer2");

    payload = {
      playerId: socket2.id,
    };

    hostPlayer(payload, socket, io);
    game = findGameByName(gameName);
    expect(game.players[0].name).toMatch("MyPlayer2");
    expect(game.players[1].name).toMatch("MyPlayer1");
  });

  test("Start a game", () => {
    const gameName = "fwegw";
    let socket = new FakeSocket();
    let socket2 = new FakeSocket();
    let io = new FakeSocket();

    startGame(socket, io); // Test with unexisting game
    expect(socket.msg[0]).toMatch("game:started");
    expect(socket.msgObj[0].error).toMatch("Game name do not exist");

    let payload = {
      gameName,
      playerName: "MyPlayer1",
    };
    createGame(payload, socket, io);
    payload = {
      gameName,
      playerName: "MyPlayer2",
    };
    joinGame(payload, socket2, io);
    socket2.msg = [];
    socket2.msgObj = [];
    startGame(socket2, io); // Test with no permissions user
    expect(socket2.msg[0]).toMatch("game:started");
    expect(socket2.msgObj[0].error).toMatch(
      "Player do not exist or do not have permission"
    );

    io.msg = [];
    io.msgObj = [];
    startGame(socket, io);
    expect(io.msg[0]).toMatch("game:started");
    expect(io.msgObj[0]).toMatchObject({});
  });

  test("Start tetris", () => {
    const gameName = "dasdasfxzw";
    let socket = new FakeSocket();
    let io = new FakeSocket();

    startTetris(socket); // Test with unexisting game
    expect(socket.msg.length).toBe(0);
    let payload = {
      gameName,
      playerName: "MyPlayer1",
    };
    createGame(payload, socket, io);

    startTetris(socket);
    let game = findGameByName(gameName);
    setTimeout(() => {
      game.players[0].isOver = true;
    }, 17);
    expect(game.players[0].level).toBe(1);
  });
});

/// IN GAME ///
describe("In game", () => {
  test("move", () => {
    const gameName = "dasdarrzw";
    let socket = new FakeSocket();
    let io = new FakeSocket();
    let payload = {
      move: "ArrowLeft",
    };

    moveInGame(payload, socket); // Test with unexisting game
    expect(socket.msg.length).toBe(0);
    payload = {
      gameName,
      playerName: "MyPlayer1",
    };
    createGame(payload, socket, io);

    payload = {
      move: "ArrowLeft",
    };
    moveInGame(payload, socket);
    let game = findGameByName(gameName);
    expect(game.players[0].moveQueue.length).toBe(1);
  });
});
