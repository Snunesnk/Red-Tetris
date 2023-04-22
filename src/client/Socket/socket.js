import io from "socket.io-client";
import setListeners from "./socketListeners";

let socket;

if (window.location.hostname === "localhost")
  socket = io.connect(window.location.hostname + ":3042");

export function initSockets(dispatch) {
  setListeners(socket, dispatch);
}

export default socket;
