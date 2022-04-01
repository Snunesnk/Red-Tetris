const { Server } = require("socket.io");
const createGame = require("./Game/create");
const joinGame = require("./Game/join");
const listGames = require("./Game/list");
const moveInGame = require("./InGame/move");

function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3024",
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
    socket.on("inGame:move", (payload) => {
      moveInGame(payload, socket);
    });
  });
  return io;
}

module.exports = initSocket;
