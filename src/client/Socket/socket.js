import io from "socket.io-client";
import setListeners from "./socketListeners";

let socket = io.connect("http://localhost:3042");
setListeners(socket);

export default socket;
