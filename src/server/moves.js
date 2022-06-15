const { testDraw } = require("./draw");
const { NORMAL_ROTATION, I_ROTATION, PIECE_DREW, MOVE_NOT_PERMITTED } = require("./const");

function moveLeft(player, piece) {
    player.currentPieceX -= 1;

    if (testDraw(player.map, player.currentPieceX, player.currentPieceY, piece) == MOVE_NOT_PERMITTED) {
        player.currentPieceX += 1;
    }
}

function moveRight(player, piece) {
    player.currentPieceX += 1;

    if (testDraw(player.map, player.currentPieceX, player.currentPieceY, piece) == MOVE_NOT_PERMITTED) {
        player.currentPieceX -= 1;
    }
}

function rotate(game, player, piece, rotIndex) {
    const prevX = player.currentPieceX;
    const prevY = player.currentPieceY;
    const nextRotation = (player.currentPieceRotation + 1) % 4;

    // Perform the appropriate translation for this attempt
    // I piece
    if (piece.type == 0) {
        player.currentPieceX += I_ROTATION[player.currentPieceRotation][rotIndex].x;
        player.currentPieceY += I_ROTATION[player.currentPieceRotation][rotIndex].y;
    }
    // Other pieces
    else {
        player.currentPieceX += NORMAL_ROTATION[player.currentPieceRotation][rotIndex].x;
        player.currentPieceY += NORMAL_ROTATION[player.currentPieceRotation][rotIndex].y;
    }

    if (testDraw(player.map, player.currentPieceX, player.currentPieceY, game.pieces[player.currentPiece].content[nextRotation]) == MOVE_NOT_PERMITTED) {
        // Restore data
        player.currentPieceX = prevX;
        player.currentPieceY = prevY;

        // If the drawing fails, two cases:
        //  - One or more rotations test are to be performed, so do them
        //  - All rotations tests have been performed, so the rotation is impossible

        // If there's still some rotation tests to perform, do them.
        if (rotIndex < 4) {
            rotate(game, player, piece, rotIndex + 1);
        }
    }
    // If the draw succeed, update the piece rotation
    else {
        player.currentPieceRotation = nextRotation;
    }
}

function putPieceDown(player, piece) {
    let currentY = player.currentPieceY;
    let lastYpossible = player.currentPieceY;

    while (testDraw(player.map, player.currentPieceX, currentY, piece) == PIECE_DREW) {
        lastYpossible = currentY;
        currentY += 1;
    }

    player.currentPieceY = lastYpossible;
    player.gravityApply = true;
}


module.exports = { moveLeft, moveRight, rotate, putPieceDown };