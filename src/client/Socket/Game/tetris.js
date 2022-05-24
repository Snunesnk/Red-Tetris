import socket from "../socket";

export function emitStartTetris(gameName, playerName) {
    console.log("Going to emit start tetris with " + gameName + " " + playerName);
    socket.emit("game:tetrisStart", { gameName, playerName });
}

export function onNewMap(dispatch, payload) {
    // error: payload null if gameName is already taken
    console.log("client hit -> game:newMap");
    if (payload) {
        console.log("New map");
        console.log(payload);
        dispatch({ type: "map:new", map: payload.map });
    }
    else
        console.log("error");
}