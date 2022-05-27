const consts = require("./const");
const { draw, placeLine, eraseLine } = require("./draw");
const { moveLeft, moveRight, rotate } = require("./moves");

let gravityApply = false;


async function tetris(game, player, socket) {
    const intervalGrav = setInterval(() => {
        gravityApply = true;
    }, consts.levels[player.level]);

    const intervalMov = setInterval(() => {
        handleGame(game, player, socket);

        if (player.isOver) {
            clearInterval(intervalMov);
            clearInterval(intervalGrav);

            socket.emit("game:over");
        }
    }, 5);
}

// Maybe I can implement a move queue, as long as there are move this function is triggered, plus 
// Every X time this function is also triggered, it has to corresponds with the time when the gravity
// is applied 
function handleGame(game, player, socket) {
    const piece = game.pieces[player.currentPiece].content[player.currentPieceRotation];

    let changed = false;
    // Handle new piece at the same time than gravity,
    // because I need to disable gravity after both functions
    if (gravityApply || player.currentPieceY == -1) {
        if (player.currentPieceY == -1)
            handleNewPiece(player, piece)
        else
            handleGravity(player, piece);
        gravityApply = false;
        changed = true;
    }

    if (player.moveQueue.length > 0) {
        handleMove(game, player, player.moveQueue.shift(), piece);
        changed = true;
    }

    // Maybe for a bonus
    // calculateScore(obj, lines_cleared);

    // player.isOver = isPlayerOver(game, player);

    if (changed) {
        socket.emit("map:new", { map: player.map });

        if (game.pieces.length - player.currentPiece < 3)
            game.addPieces(10);
    }
}

function handleNewPiece(player, piece) {
    // Init new coordinates to draw the piece
    player.currentPieceX = 3;
    player.currentPieceY = 0;

    // Check if there's still enough room for the piece
    if (hasHitBottom(player.map, piece, player.currentPieceY, player.currentPieceX)) {
        player.isOver = true;

        // Display only the part of the new piece that should be visible
        let height = 0;

        for (let j = 0; j >= piece.length - 1; j--) {
            if (!piece[j].every(val => val == 0))
                height++;
            else
                break;
        }

        player.currentPieceY = 1 - height;

        // One day I will manage to draw the last piece
    }
    else {
        draw(player, piece, placeLine);
    }
}

function handleGravity(player, piece) {
    // Erase piece at previous position 
    draw(player, piece, eraseLine);

    if (!hasHitBottom(player.map, piece, player.currentPieceY + 1, player.currentPieceX)) {
        player.currentPieceY += 1;

        const drew = draw(player, piece, placeLine);
    }
    // If the piece will hit the bottom, draw it back
    // Maybe I can avoid to erase then to draw it back, but it is much easier
    // for the calculations
    else {
        draw(player, piece, placeLine);

        // Check if line were cleared
        player.lineCleared += handleClearedLines(player);

        player.getNextPiece();
    }

    // Okay so for the gravity, I just need to first erase the piece on
    // its current position on the map, then draw it again one raw down
    // (so with y + 1)
    // There is room for improvment here

    // If the piece hit the bottom, then it's time for the next piece
}

function handleMove(game, player, move, piece) {
    switch (move) {
        case "ArrowLeft":
            moveLeft(player, piece);
            break;

        case "ArrowRight":
            moveRight(player, piece);
            break;

        case "ArrowDown":
            handleGravity(player, piece);
            break;

        case " ":
            while (player.currentPieceY != -1)
                handleGravity(player, piece);
            break;

        case "ArrowUp":
            rotate(game, player, piece);
            break;
    }
}

function handleClearedLines(player) {
    let clearedLines = 0;

    for (let i = 0; i < player.map.length; i++) {
        if (player.map[i].every(val => val != 0)) {
            clearedLines += 1;
            player.map.splice(i, 1);
            player.map.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
    }

    return clearedLines;
}

// Check if a piece at given coordinates will hit the bottom
function hasHitBottom(map, piece, y, x) {
    let pieceHeight = piece.length;
    let emptyLine = 0;

    piece.forEach((elem, index) => {
        // Do not count the lines at the end of the piece
        if (index > emptyLine)
            return;

        if (elem.every(val => val == 0))
            emptyLine++;
        else
            return;
    });

    piece.forEach(line => {
        if (line.every(val => val == 0))
            pieceHeight--;
    });

    // Do not go past the edge of the map
    // TODO: Change this to integrate the "Tas"
    if (y + pieceHeight > map.length)
        return true;

    // Check if there's something under
    for (let i = piece.length - 1; i >= 0; i--) {
        if (piece[i].every(val => val == 0))
            continue;

        for (let j = 0; j < piece[i].length; j++) {
            if (map[y + i - emptyLine][x + j] != 0 && piece[i][j] != 0)
                return true;
        }
    }

    return false;
}

module.exports = { tetris };