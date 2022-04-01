import { onGameCreated } from "./Game/create";
import { onGameJoined } from "./Game/join";
import { onGamesListed } from "./Game/list";
import { onInGameMoved } from "./InGame/move";

export default function setListeners(socket) {
  socket.on("game:created", (payload) => {
    onGameCreated(payload);
  });
  socket.on("game:joined", (payload) => {
    onGameJoined(payload);
  });
  socket.on("game:listed", (payload) => {
    onGamesListed(payload);
  })
  socket.on("inGame:moved", (payload) => {
    onInGameMoved(payload);
  });
}
