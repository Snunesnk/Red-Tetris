import io from "socket.io-client";
import setListeners from "./socketListeners";

const PORT = process.env.PORT || 3042
const domain = PORT == 3042 ? "http://localhost:" + PORT : window.location.hostname;
let socket = io.connect(domain);

console.log("Domain: " + domain);

export function initSockets(dispatch) {
    setListeners(socket, dispatch);
}

export default socket;
