import io from "socket.io-client";
import setListeners from "./socketListeners";

const PORT = process.env.PORT || 3042
let socket = io.connect("http://0.0.0.0:" + PORT);

export function initSockets(dispatch) {
    setListeners(socket, dispatch);
}

export default socket;