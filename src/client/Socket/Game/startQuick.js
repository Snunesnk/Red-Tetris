import socket from "../socket";

export function emitStartGameQuick(playerName, gameDuration) {
  socket.emit("game:startQuick", { playerName, gameDuration });
}

export function onGameQuickStarted(dispatch, payload) {
  if (!payload.error) {
    dispatch({ type: "state:gameQuickStarted" });
    console.log("Game started");
  } else console.log(payload.error);
}
