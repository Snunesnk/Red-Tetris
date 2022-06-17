import io from "socket.io-client";
import setListeners from "./socketListeners";

const port = process.env.PORT || 3042;

let socket = io.connect("http://localhost:" + port);

export function initSockets(dispatch) {
    setListeners(socket, dispatch);
}

export default socket;
