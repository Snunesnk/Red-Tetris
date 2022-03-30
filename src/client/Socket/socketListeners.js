import socket from "./socket";

function setListeners(dispatch) {
    socket.on("move", data => dispatch({ type: "move", data: data }));
}

export default setListeners;