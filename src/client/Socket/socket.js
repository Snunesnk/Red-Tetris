import io from "socket.io-client";
import setListeners from "./socketListeners";

let socket = io.connect("http://localhost:3042");

export function initSockets(dispatch) {
    setListeners(socket, dispatch);
}

export default socket;
