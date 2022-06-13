const { draw, placeLine, eraseLine } = require("./draw");
const { NORMAL_ROTATION, I_ROTATION, PIECE_DREW } = require("./const");

function moveLeft(player, piece) {
    draw(player, piece, eraseLine);
    player.currentPieceX -= 1;

    if (draw(player, piece, placeLine) != PIECE_DREW) {
        player.currentPieceX += 1;
        draw(player, piece, placeLine)
    }
}

function moveRight(player, piece) {
    draw(player, piece, eraseLine);
    player.currentPieceX += 1;

    if (draw(player, piece, placeLine) != PIECE_DREW) {
        player.currentPieceX -= 1;
        draw(player, piece, placeLine)
    }
}

function rotate(game, player, piece, rotIndex) {
    draw(player, piece.content[player.currentPieceRotation], eraseLine);
    const prevRotation = player.currentPieceRotation;
    const prevX = player.currentPieceX;
    const prevY = player.currentPieceY;

    player.currentPieceRotation = (player.currentPieceRotation + 1) % 4;

    piece = game.pieces[player.currentPiece];

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

    if (draw(player, piece.content[player.currentPieceRotation], placeLine) != 0) {
        // Restore data
        player.currentPieceX = prevX;
        player.currentPieceY = prevY;
        player.currentPieceRotation = prevRotation;
        piece = game.pieces[player.currentPiece];

        // If the drawing fails, two cases:
        //  - All rotations have been tested, so the rotation is impossible
        //  - One or more rotations are to be tested, so test them

        // All rotations failed
        if (rotIndex < 4)
            rotate(game, player, piece, rotIndex + 1);
    }
}


module.exports = { moveLeft, moveRight, rotate };