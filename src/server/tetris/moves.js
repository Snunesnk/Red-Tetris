const { testDraw } = require("./draw");
const {
    NORMAL_ROTATION,
    LEFT_NORMAL_ROTATION,
    I_ROTATION,
    LEFT_I_ROTATION,
    PIECE_DREW,
    MOVE_NOT_PERMITTED
} = require("../const");
const { hasHitBottom } = require("./tetris.utils");

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

function rotateLeft(game, player, piece, rotIndex) {
    const prevX = player.currentPieceX;
    const prevY = player.currentPieceY;
    const nextRotation = player.currentPieceRotation == 0 ? 3 : player.currentPieceRotation - 1;


    // Perform the appropriate translation for this attempt
    // I piece
    if (piece.type == 0) {
        player.currentPieceX += LEFT_I_ROTATION[player.currentPieceRotation][rotIndex].x;
        player.currentPieceY += LEFT_I_ROTATION[player.currentPieceRotation][rotIndex].y;
    }
    // Other pieces
    else {
        player.currentPieceX += LEFT_NORMAL_ROTATION[player.currentPieceRotation][rotIndex].x;
        player.currentPieceY += LEFT_NORMAL_ROTATION[player.currentPieceRotation][rotIndex].y;
    }

    if (testDraw(player.map, player.currentPieceX, player.currentPieceY, game.pieces[player.currentPiece].content[nextRotation], true) == MOVE_NOT_PERMITTED) {
        // Restore data
        player.currentPieceX = prevX;
        player.currentPieceY = prevY;

        // If the drawing fails, two cases:
        //  - One or more rotations test are to be performed, so do them
        //  - All rotations tests have been performed, so the rotation is impossible

        // If there's still some rotation tests to perform, do them.
        if (rotIndex < 4) {
            return rotateLeft(game, player, piece, rotIndex + 1);
        }

        return -1;
    }
    // If the draw succeed, update the piece rotation
    else {
        player.currentPieceRotation = nextRotation;
        return rotIndex;
    }
}

function rotateRight(game, player, piece, rotIndex) {
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

    if (testDraw(player.map, player.currentPieceX, player.currentPieceY, game.pieces[player.currentPiece].content[nextRotation], true) == MOVE_NOT_PERMITTED) {
        // Restore data
        player.currentPieceX = prevX;
        player.currentPieceY = prevY;

        // If the drawing fails, two cases:
        //  - One or more rotations test are to be performed, so do them
        //  - All rotations tests have been performed, so the rotation is impossible

        // If there's still some rotation tests to perform, do them.
        if (rotIndex < 4) {
            rotateRight(game, player, piece, rotIndex + 1);
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
        player.score += 2;
    }

    player.currentPieceY = lastYpossible;

    // Check if user is game over or not
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
}

function hold(player) {
    console.log("Hold");
    if (player.hasHeld === true)
        return;

    const saveHold = player.pieceHold;

    // Put current piece in hold
    console.log("Gonna get next piece");
    player.pieceHold = player.currentPiece;
    player.getNextPiece();
    player.currentPieceY -= 1;

    console.log("Next piece gotten");

    // if a piece was held, then put it back
    if (saveHold !== -1) {
        console.log("Something was already here ...");
        player.lastIndex = player.currentPiece;
        player.currentPiece = saveHold;
    }

    console.log("qiot");
    player.hasHeld = true;
}

module.exports = { moveLeft, moveRight, rotateRight, rotateLeft, putPieceDown, hold };