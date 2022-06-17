const { Server } = require("socket.io");
const createGame = require("./Game/create");
const joinGame = require("./Game/join");
const listGames = require("./Game/list");
const moveInGame = require("./InGame/move");
const startGame = require("./Game/start");
const { startTetris } = require("./Game/tetris");

const port = 3024

function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:" + port,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("game:create", (payload) => {
      createGame(payload, socket);
    });
    socket.on("game:join", (payload) => {
      joinGame(payload, socket);
    });
    socket.on("game:list", () => {
      listGames(socket);
    });
    socket.on("game:start", () => {
      startGame(socket, io);
    });
    socket.on("game:tetrisStart", () => {
      startTetris(socket);
    });
    socket.on("inGame:move", (payload) => {
      moveInGame(payload, socket);
    });
  });
  return io;
}

module.exports = initSocket;
