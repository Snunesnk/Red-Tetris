const consts = require("../const");
const { draw, placeLine, eraseLine, testDraw } = require("./draw");
const { moveLeft, moveRight, rotateRight, rotateLeft, putPieceDown } = require("./moves");
const { calculateScore, isTspin } = require("./score");

async function tetris(game, player, socket) {
    player.increaseLevel();

    // Calculate / handle one frame.
    // Make this run to target 60 fps,
    // so a total of 1000 / 60 ms
    const intervalMov = setInterval(() => {
        handleGame(game, player, socket);

        if (player.isOver) {
            clearInterval(intervalMov);
            clearInterval(player.gravityInterval);

            socket.emit("game:over");
        }
    }, 1000 / 60);
}

// Maybe I can implement a move queue, as long as there are move this function is triggered, plus 
// Every X time this function is also triggered, it has to corresponds with the time when the gravity
// is applied
function handleGame(game, player, socket) {
    // If there's no changes, do nothing
    if (!player.gravityApply && !player.needNewPiece && player.moveQueue.length == 0)
        return;

    if (!player.needNewPiece) {
        // Erase the previous piece
        draw(player.map, player.currentPieceX, player.currentPieceY, game.pieces[player.currentPiece].content[player.currentPieceRotation], eraseLine);
        // Erase previous specter
        erasePieceSpecter(player, game.pieces[player.currentPiece].content[player.currentPieceRotation]);
    }
    else {
        handleNewPiece(player, game.pieces[player.currentPiece].content[player.currentPieceRotation]);
        player.gravityApply = false;
    }

    if (player.moveQueue.length > 0) {
        const playerMove = player.moveQueue.shift();
        handleMove(game, player, playerMove, game.pieces[player.currentPiece]);
        player.moveHistory.push(playerMove);
    }

    if (player.gravityApply) {
        handleGravity(player, game.pieces[player.currentPiece].content[player.currentPieceRotation]);
        player.gravityApply = false;
    }

    // Draw the specter of the piece
    drawPieceSpecter(player, game.pieces[player.currentPiece].content[player.currentPieceRotation]);

    // Draw the actual piece
    draw(player.map, player.currentPieceX, player.currentPieceY, game.pieces[player.currentPiece].content[player.currentPieceRotation], placeLine);

    if (!player.isOver) {
        // Check if this is a T-spin before the lines get removed
        const tspin = isTspin(player, game.pieces[player.currentPiece].type);

        // Check if line were cleared
        const clearedLines = handleClearedLines(player);

        calculateScore(player, clearedLines, tspin);
    }

    socket.emit("map:new", { map: player.map, score: player.score, level: player.level });

    if (game.pieces.length - player.currentPiece < 3)
        game.addPieces(10);

    if (player.needNewPiece)
        player.getNextPiece();
}

// Check if a new piece can be put or not
// The player must be over only when the next piece can't be displayed
function handleNewPiece(player, piece) {
    player.needNewPiece = false;

    // Get the position where the piece could be displayed
    while (testDraw(player.map, player.currentPieceX, player.currentPieceY, piece) !== consts.PIECE_DREW) {
        player.currentPieceY--;
    }

    player.resetGravityInterval();
}

function handleGravity(player, piece) {
    // Check that the piece is still at the bottom
    if (hasHitBottom(player.map, piece, player.currentPieceY, player.currentPieceX)) {
        // If the piece is at the bottom but one or more of its part are off-screen, then it's game over
        for (let i = 0; i < piece.length; i++) {
            if (player.currentPieceY + i >= 0)
                break;

            if (!piece[i].every((cell) => cell === 0)) {
                player.isOver = true;
                break;
            }
        }

        player.needNewPiece = true;
    }
    else {
        player.currentPieceY += 1;

        // // Handle lock
        // if (hasHitBottom(player.map, piece, player.currentPieceY, player.currentPieceX)) {
        //     player.setDeadLock();
        // }
    }
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
            player.score += 1;
            break;

        case " ":
            putPieceDown(player, piece.content[player.currentPieceRotation]);
            break;

        case "ArrowUp":
            rotateRight(game, player, piece, 0);
            break;

        case "c":
            rotateLeft(game, player, piece, 0);
            break;
    }
}

function handleClearedLines(player) {
    // Check only if the pllayer needs a new piece,
    // Wich means that the previous one was  integrated to the tas
    if (!player.needNewPiece)
        return;

    let clearedLines = 0;

    for (let i = 0; i < player.map.length; i++) {
        if (player.map[i].every(val => val != 0 && val <= 7)) {
            clearedLines += 1;
            player.map.splice(i, 1);
            player.map.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
    }

    player.clearedLines += clearedLines;

    // Increase the player level each time he clears 10 lines
    if (player.clearedLines / 10 > player.level)
        player.increaseLevel();

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
                && y + i + 1 >= 0
                && (y + i + 1 >= map.length || (map[y + i + 1][x + j] !== 0 && map[y + i + 1][x + j] <= 7))) {
                return true;
            }
        }
    }

    return false;
}

function drawPieceSpecter(player, piece) {
    let currentY = player.currentPieceY;
    let lastYpossible = player.currentPieceY;

    while (testDraw(player.map, player.currentPieceX, currentY, piece) == consts.PIECE_DREW) {
        lastYpossible = currentY;
        currentY += 1;
    }

    // Do not make the specter overlap the real piece
    if (lastYpossible != player.currentPieceY) {
        const pieceSpecter = piece.map((col) => {
            return col.map((cell) => {
                if (cell != 0)
                    return cell + 7;
                return 0;
            });
        });

        draw(player.map, player.currentPieceX, lastYpossible, pieceSpecter, placeLine);
        player.currentSpecterY = lastYpossible;
    }
}

function erasePieceSpecter(player, piece) {
    const pieceSpecter = piece.map((col) => {
        return col.map((cell) => {
            if (cell != 0)
                return cell + 7;
            return 0;
        });
    })

    draw(player.map, player.currentPieceX, player.currentSpecterY, pieceSpecter, eraseLine);
}

module.exports = { tetris };