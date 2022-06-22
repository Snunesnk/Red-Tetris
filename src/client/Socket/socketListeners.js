import { onGameCreated } from "./Game/create";
import { onGameEdited } from "./Game/edit";
import { onGameJoined } from "./Game/join";
import { onGamesListed } from "./Game/list";
import { onGameStarted } from "./Game/start";
import { onNewMap } from "./InGame/updateMap";
import { onNewSpecter } from "./InGame/updateSpecter";
import { onGameOver } from "./Game/tetris";


export default function setListeners(socket, dispatch) {

  socket.on("game:created", (payload) => {
    onGameCreated(dispatch, payload);
  });

  socket.on("game:edited", (payload) => {
    console.log("Hmm");
    console.log(payload);
    onGameEdited(dispatch, payload);
  })

  socket.on("game:joined", (payload) => {
    onGameJoined(dispatch, payload);
  });

  socket.on("game:listed", (payload) => {
    onGamesListed(dispatch, payload);
  });

  socket.on("game:started", (payload) => {
    onGameStarted(dispatch, payload);
  });

  socket.on("ingame:updateMap", (payload) => {
    onNewMap(dispatch, payload);
  });

  socket.on("ingame:updateSpecter", (payload) => {
    onNewSpecter(dispatch, payload);
  });


  socket.on("game:over", () => {
    onGameOver(dispatch);
  })
}
