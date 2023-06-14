const { Server } = require("socket.io");
const createGame = require("./Game/create");
const joinGame = require("./Game/join");
const listGames = require("./Game/list");
const moveInGame = require("./InGame/move");
const startGame = require("./Game/start");
const { startTetris } = require("./Game/tetris");
const { deletePlayer } = require("../players");
const kickPlayer = require("./Game/kick");
const hostPlayer = require("./Game/host");
const retryGame = require("./Game/retry");
const startQuickGame = require("./Game/startQuick");
const stopGame = require("./Game/stop");

function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected");
    socket.on("game:create", (payload) => {
      createGame(payload, socket, io);
    });
    socket.on("game:join", (payload) => {
      joinGame(payload, socket, io);
    });
    socket.on("game:list", () => {
      listGames(socket);
    });
    socket.on("game:start", () => {
      startGame(socket, io);
    });
    socket.on("game:startQuick", (payload) => {
      startQuickGame(payload, socket, io);
    });
    socket.on("game:tetrisStart", () => {
      startTetris(socket, io);
    });
    socket.on("inGame:move", (payload) => {
      moveInGame(payload, socket);
    });
    socket.on("disconnect", () => {
      deletePlayer(socket, io);
    });
    socket.on("game:kickPlayer", (payload) => {
      kickPlayer(payload, socket, io);
    });
    socket.on("game:hostPlayer", (payload) => {
      hostPlayer(payload, socket, io);
    });
    socket.on("game:retry", () => retryGame(socket, io));
    socket.on("game:timeOver", (payload) => {
      stopGame(payload, socket, io);
    });
  });
  return io;
}

module.exports = initSocket;
