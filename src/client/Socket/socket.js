import io from "socket.io-client";

let socket = io("http://localhost:3042");

export default socket;