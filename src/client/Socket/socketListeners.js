import { onGameCreated } from "./Game/create";
import { onGameJoined } from "./Game/join";
import { onGamesListed } from "./Game/list";
import { onInGameMoved } from "./InGame/move";
import { onGameStarted } from "./Game/start";
import { onNewMap } from "./Game/tetris";


export default function setListeners(socket, dispatch) {

  socket.on("game:created", (payload) => {
    onGameCreated(dispatch, payload);
  });

  socket.on("game:joined", (payload) => {
    onGameJoined(dispatch, payload);
  });

  socket.on("game:listed", (payload) => {
    onGamesListed(dispatch, payload);
  });

  socket.on("game:started", (payload) => {
    onGameStarted(dispatch, payload);
  });

  socket.on("inGame:moved", (payload) => {
    onInGameMoved(dispatch, payload);
  });

  socket.on("map:new", (payload) => {
    console.log("New map reiceived");
    console.log(payload);
    onNewMap(dispatch, payload);
  })
}
