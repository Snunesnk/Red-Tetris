const consts = require("./const");


let gravityApply = false;


async function tetris(game, player, socket) {
    const intervalGrav = setInterval(() => {
        gravityApply = true;
    }, consts.levels[player.level]);

    const intervalMov = setInterval(() => {
        handleGame(game, player, socket);
    }, 5);
}

// Maybe I can implement a move queue, as long as there are move this function is triggered, plus 
// Every X time this function is also triggered, it has to corresponds with the time when the gravity
// is applied 
function handleGame(game, player, socket, move = null) {
    let changed = false;
    // Handle new piece at the same time than gravity,
    // because I need to disable gravity after both functions
    if (gravityApply || player.currentPieceY == -1) {
        if (player.currentPieceY == -1)
            handleNewPiece(game, player)
        else
            handleGravity(game, player);
        gravityApply = false;
        changed = true;
    }

    if (move !== null) {
        handleMove(game, player, move);
        changed = true;
    }

    // Check for cleared lines
    // player.lineCleared = checkLines(game, player);

    // Maybe for a bonus
    // calculateScore(obj, lines_cleared);

    // player.isOver = isPlayerOver(game, player);

    if (changed) {
        // console.log("Gonna send the map");
        socket.emit("map:new", { map: player.map });
    }
}

function handleNewPiece(game, player) {
    // console.log("Current piece: " + player.currentPiece + ", rotation: " + player.currentPieceRotation);
    // console.log("Pieces")
    // console.log(game.pieces[player.currentPiece]);
    const piece = game.pieces[player.currentPiece].content[player.currentPieceRotation];

    // Init new coordinates to draw the piece
    player.currentPieceY = 0;
    player.currentPieceX = 3;

    // Handle the first empty if exists, by applying a malus
    const emptyLine = piece[0].every(val => val == 0) ? 1 : 0;
    for (let i = 0; i < piece.length; i++) {
        // Do not draw if the line is empty
        if (!piece[i].every(val => val == 0))
            draw(player.map, piece[i], player.currentPieceX, player.currentPieceY - emptyLine + i);
    }
}

function handleGravity(game, player) {
    // console.log("Gravity");
}

function handleMove(game, player, move) {
    console.log("Move: " + move);
}

function draw(map, line, x, y) {
    for (let i = 0; i < line.length; i++) {
        if (line[i] == 0)
            continue;
        if (map[y][x + i] != 0)
            return;
        else
            map[y][x + i] = line[i];
    }
}

module.exports = { tetris };