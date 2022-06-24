import io from "socket.io-client";
import setListeners from "./socketListeners";

let socket;

if (window.location.hostname === "localhost")
    socket = io.connect(window.location.hostname + ":3042");
else
    socket = io.connect(window.location.hostname);

export function initSockets(dispatch) {
    setListeners(socket, dispatch);
}

export default socket;
