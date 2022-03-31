function joinGame(payload, socket) {
  console.log("hit => game:join");
  console.log(payload);
  socket.emit("game:joined", { playerName: payload.playerName });
}

module.exports = joinGame;
