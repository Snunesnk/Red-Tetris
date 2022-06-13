const consts = require("./const");
const { draw, placeLine, eraseLine } = require("./draw");
const { moveLeft, moveRight, rotate } = require("./moves");

async function tetris(game, player, socket) {
    player.increaseLevel();

    const intervalMov = setInterval(() => {
        handleGame(game, player, socket);

        if (player.isOver) {
            clearInterval(intervalMov);
            clearInterval(player.gravityInterval);

            socket.emit("game:over");
        }
    }, 5);
}

// Maybe I can implement a move queue, as long as there are move this function is triggered, plus 
// Every X time this function is also triggered, it has to corresponds with the time when the gravity
// is applied 
function handleGame(game, player, socket) {
    const piece = game.pieces[player.currentPiece];

    let changed = false;
    // Handle new piece at the same time than gravity,
    // because I need to disable gravity after both functions
    if (player.gravityApply || player.needNewPiece == true) {
        if (player.needNewPiece == true)
            handleNewPiece(player, piece.content[player.currentPieceRotation])
        else
            handleGravity(player, piece.content[player.currentPieceRotation]);
        player.gravityApply = false;
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
    player.needNewPiece = false;

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
        // Check if there's an empty line before drawing the piece
        let emptyLine = piece[0].every(val => val == 0) ? 1 : 0;
        player.currentPieceY -= emptyLine;

        draw(player, piece, placeLine);
    }
}

let bottomHit = false;

function handleGravity(player, piece) {
    // Check that the piece is still at the bottom
    if (bottomHit && hasHitBottom(player.map, piece, player.currentPieceY, player.currentPieceX)) {
        bottomHit = false;
        // Check if line were cleared
        player.lineCleared += handleClearedLines(player);

        // Increase level every 10 lines
        if (player.lineCleared / 5 > player.level)
            player.increaseLevel();

        player.getNextPiece();
        return;
    }

    // Erase piece at previous position
    draw(player, piece, eraseLine);

    player.currentPieceY += 1;

    const drew = draw(player, piece, placeLine);
    // If the piece will hit the bottom, draw it back
    // Maybe I can avoid to erase then to draw it back, but it is much easier
    // for the calculations
    bottomHit = hasHitBottom(player.map, piece, player.currentPieceY, player.currentPieceX)
}

function handleMove(game, player, move, piece) {
    switch (move) {
        case "ArrowLeft":
            moveLeft(player, piece.content[player.currentPieceRotation]);
            break;

        case "ArrowRight":
            moveRight(player, piece.content[player.currentPieceRotation]);
            break;

        case "ArrowDown":
            handleGravity(player, piece.content[player.currentPieceRotation]);
            break;

        case " ":
            while (player.needNewPiece != true)
                handleGravity(player, piece.content[player.currentPieceRotation]);
            break;

        case "ArrowUp":
            rotate(game, player, piece, 0);
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
    for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece[i].length; j++) {
            // For each piece's cell that has an empty space under
            // (or is the end of the piece), check if it's out of the map
            // or if there's a piece under it
            if (piece[i][j] !== 0
                && (i === piece.length - 1 || piece[i + 1][j] === 0)
                && (y + i + 1 >= map.length || map[y + i + 1][x + j] !== 0)) {
                return true;
            }
        }
    }

    return false;
}

module.exports = { tetris };