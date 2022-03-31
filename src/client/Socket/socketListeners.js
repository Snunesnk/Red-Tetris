import { onGameCreated } from "./Game/create";
import { onGameJoined } from "./Game/join";
import { onInGameMoved } from "./InGame/move";

export default function setListeners(socket) {
  socket.on("game:created", (payload) => {
    onGameCreated(payload, socket);
  });
  socket.on("game:joined", (payload) => {
    onGameJoined(payload, socket);
  });
  socket.on("inGame:moved", (payload) => {
    onInGameMoved(payload, socket);
  });
}
