const consts = require("../const");
const updateMap = require("../Socket/InGame/updateMap");
const { updateSpecter } = require("../Socket/InGame/updateSpecter");
const { draw, placeLine, eraseLine, testDraw } = require("./draw");
const { moveLeft, moveRight, rotateRight, rotateLeft, putPieceDown, hold } = require("./moves");
const { calculateScore, isTspin } = require("./score");
const { addUnbreakableLines } = require("./unbreakableLines");
const { hasHitBottom, drawPieceSpecter, erasePieceSpecter } = require("./tetris.utils");
const gameOver = require("../Socket/InGame/gameOver");

async function tetris(game, player, socket, io) {
    player.increaseLevel();

    // Calculate / handle one frame.
    while (!player.isOver) {
        handleGame(game, player, socket);
        // 17 milliseconds waiting between each frames is approximately 60fps
        await new Promise(resolve => setTimeout(resolve, 17));
    }

    gameOver(game, socket, io);
}

// Maybe I can implement a move queue, as long as there are move this function is triggered, plus 
// Every X time this function is also triggered, it has to corresponds with the time when the gravity
// is applied
function handleGame(game, player, socket) {
    if (player.needsUpdate) {
        player.needsUpdate = false;
        draw(player.map, player.currentPieceX, player.currentPieceY, game.pieces[player.currentPiece].content[player.currentPieceRotation], eraseLine);
        erasePieceSpecter(player, game.pieces[player.currentPiece].content[player.currentPieceRotation]);
        updateSpecter(game, player, socket);
    }

    // If there's nothing to do, do nothing
    if (new Date().getTime() - player.pieceTimestamp < player.gravityInterval
        && !player.needNewPiece
        && player.moveQueue.length == 0) {
        return;
    }

    if (!player.needNewPiece) {
        // Erase the previous piece
        draw(player.map, player.currentPieceX, player.currentPieceY, game.pieces[player.currentPiece].content[player.currentPieceRotation], eraseLine);
        // Erase previous specter
        erasePieceSpecter(player, game.pieces[player.currentPiece].content[player.currentPieceRotation]);
    }
    else {
        updateSpecter(game, player, socket);
        // Tells the others players that a new piece has been placed
        handleNewPiece(player, game.pieces[player.currentPiece]);
    }

    if (player.moveQueue.length > 0) {
        const playerMove = player.moveQueue.shift();
        handleMove(player, playerMove, game.pieces[player.currentPiece]);
        player.moveHistory.push(playerMove);
    }

    if (new Date().getTime() - player.pieceTimestamp >= player.gravityInterval) {
        handleGravity(player, game.pieces[player.currentPiece], game);
    }

    if (player.lastLineCleared > 1)
        addUnbreakableLines(game, player.socketId, player.lastLineCleared - 1);

    // Draw the specter of the piece
    drawPieceSpecter(player, game.pieces[player.currentPiece].content[player.currentPieceRotation]);

    // Draw the actual piece
    draw(player.map, player.currentPieceX, player.currentPieceY, game.pieces[player.currentPiece].content[player.currentPieceRotation], placeLine);

    if (!player.isOver) {
        // Check if this is a T-spin before the lines get removed
        const tspin = isTspin(player, game.pieces[player.currentPiece].type);

        // Check if line were cleared
        player.lastLineCleared = handleClearedLines(player);

        calculateScore(player, player.lastLineCleared, tspin);
    }

    updateMap(game, player, socket);

    if (game.pieces.length - player.currentPiece < 10)
        game.addPieces(10);

    if (player.needNewPiece)
        player.getNextPiece();
}

// Check if a new piece can be put or not
// The player must be over only when the next piece can't be displayed
function handleNewPiece(player, piece) {
    const pieceContent = piece.content[player.currentPieceRotation];
    player.needNewPiece = false;

    // Get the position where the piece could be displayed
    while (testDraw(player.map, player.currentPieceX, player.currentPieceY, pieceContent) !== consts.PIECE_DREW) {
        player.currentPieceY--;
    }

    player.pieceTimestamp = new Date().getTime();
}

function handleGravity(player, piece) {
    const pieceContent = piece.content[player.currentPieceRotation]
    // Check that the piece is still at the bottom
    if (hasHitBottom(player.map, pieceContent, player.currentPieceY, player.currentPieceX)) {
        // If the piece is at the bottom but one or more of its part are off-screen, then it's game over
        for (let i = 0; i < pieceContent.length; i++) {
            if (player.currentPieceY + i >= 0)
                break;

            if (!pieceContent[i].every((cell) => cell === 0)) {
                player.isOver = true;
                break;
            }
        }
        player.needNewPiece = true;
    }
    else {
        player.currentPieceY += 1;

        // Handle lock delay
        if (hasHitBottom(player.map, pieceContent, player.currentPieceY, player.currentPieceX)) {
            player.gravityInterval = 500;
        }
        // If the piece is not at the bottom and lock delay was set, remove it
        else if (player.gravityInterval == 500 && new Date().getTime() - player.pieceTimestamp >= 500)
            player.gravityInterval = consts.levels[player.level - 1]

        // Reset timestamp if needed
        if (new Date().getTime() - player.pieceTimestamp >= player.gravityInterval) {
            player.pieceTimestamp = new Date().getTime();
        }
    }
}

function handleMove(player, move, piece) {
    switch (move) {
        case "ArrowLeft":
            moveLeft(player, piece.content[player.currentPieceRotation]);
            break;

        case "ArrowRight":
            moveRight(player, piece.content[player.currentPieceRotation]);
            break;

        case "ArrowDown":
            handleGravity(player, piece);
            player.score += 1;
            break;

        case " ":
            putPieceDown(player, piece.content[player.currentPieceRotation]);
            break;

        case "ArrowUp":
            rotateRight(player, piece, 0);
            break;

        case "z":
            rotateLeft(player, piece, 0);
            break;

        case "c":
            hold(player);
            break;

        default:
            break;
    }
}

function handleClearedLines(player) {
    // Check only if the player needs a new piece,
    // Wich means that the previous one was  integrated to the tas
    if (!player.needNewPiece)
        return;

    let clearedLines = 0;

    for (let i = 0; i < player.map.length; i++) {
        if (player.map[i].every(val => val > 0 && val <= 7)) {
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

module.exports = {
    tetris,
    handleGame,
    handleNewPiece,
    handleGravity,
    handleMove,
    handleClearedLines
};