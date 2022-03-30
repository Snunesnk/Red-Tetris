import socket from "./socket";

const acceptedKeys = [
    "ArrowUp",
    "ArrowRight",
    "ArrowDown",
    "ArrowLeft",
    " "
];

function emitSignal(key) {
    if (acceptedKeys.indexOf(key) !== -1)
        socket.emit("move", { keyCode: key });
}

export default emitSignal;