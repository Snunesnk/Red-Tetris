import socket from "./socket";

function setListeners(dispatch) {
    socket.on("Movement", data => dispatch({ type: "movement", data: data }));
}

export default setListeners;