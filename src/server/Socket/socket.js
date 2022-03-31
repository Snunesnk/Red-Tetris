const { Server } = require("socket.io");
const createGame = require("./Game/create");
const joinGame = require("./Game/join");
const moveInGame = require("./InGame/move");

function initSocket(httpServer) {
  const io = new Server(httpServer, {
    /* options */
  });

  io.on("connection", (socket) => {
    socket.on("game:create", (payload) => {
      createGame(payload, socket);
    });
    socket.on("game:join", (payload) => {
      joinGame(payload, socket);
    });
    socket.on("inGame:move", (payload) => {
      moveInGame(payload, socket);
    });
  });
  return io;
}

module.exports = initSocket;
