import createGame from "./Game/create";
import { Games } from "../const";
import joinGame from "./Game/join";
import hostPlayer from "./Game/host";
import FakeSocket from "./socket.test";

/// GAME ///
describe("Game", () => {
  test("Create a game", () => {
    let socket = new FakeSocket();
    let io = new FakeSocket();
    let payload = {
      gameName: "MyGameCreated",
      playerName: "MyPlayer",
    };
    createGame(payload, socket, io);

    expect(Games[0].name).toMatch("MyGameCreated");
    expect(Games[0].players[0].name).toMatch("MyPlayer");

    createGame(payload, socket, io);
    expect(socket.msg[3]).toMatch("game:created");
    expect(socket.msgObj[3].error).toMatch("Name already taken");
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
      gameName,
      playerName: "MyPlayer1",
    };

    createGame(payload, socket, io);
    payload = {
      gameName,
      playerName: "MyPlayer2",
    };
    joinGame(payload, socket2, io);
    expect(Games[0].players[0].name).toMatch("MyPlayer1");
    expect(Games[0].players[1].name).toMatch("MyPlayer2");

    payload = {
      playerId: socket2.id,
    };

    hostPlayer(payload, socket, io);
    expect(Games[0].players[0].name).toMatch("MyPlayer2");
    expect(Games[0].players[1].name).toMatch("MyPlayer1");
  });
});

/// IN GAME ///
describe("In game", () => {});
