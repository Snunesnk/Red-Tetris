function moves(key) {
    switch (key.keyCode) {
        case "ArrowUp":
            console.log("Rotate");
            return;

        case "ArrowLeft":
            console.log("Move left");
            return;

        case "ArrowRight":
            console.log("Move right");
            return;

        case "ArrowDown":
            console.log("Move down");
            return;

        case " ":
            console.log("Go down");
            return;

        default:
            return;

    }
}

module.exports = { moves };