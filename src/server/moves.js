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
    console.log("Trying rotation " + rotIndex);
    draw(player, piece.content[player.currentPieceRotation], eraseLine);
    const prevX = player.currentPieceX;
    const prevY = player.currentPieceY;
    const nextRotation = (player.currentPieceRotation + 1) % 4;

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

    console.log("Rotation: ");
    console.log(NORMAL_ROTATION[player.currentPieceRotation][rotIndex]);
    console.log("Top left piece coordinates: [" + player.currentPieceX + ", " + player.currentPieceY + "]");

    if (draw(player, piece.content[nextRotation], placeLine) != 0) {
        // Restore data
        player.currentPieceX = prevX;
        player.currentPieceY = prevY;
        piece = game.pieces[player.currentPiece];

        // If the drawing fails, two cases:
        //  - All rotations have been tested, so the rotation is impossible
        //  - One or more rotations are to be tested, so test them

        // If there's still some rotation to test, test them.
        // Otherwise, draw the piece as it was
        if (rotIndex < 4) {
            console.log("Rotation failed");
            rotate(game, player, piece, rotIndex + 1);
        }
        else {
            console.log("rotation completey failed ...");
            draw(player, piece.content[player.currentPieceRotation], placeLine);
        }
    }
    // If the draw succeed, update the piece rotation
    else {
        console.log("Rotation complete !");
        player.currentPieceRotation = nextRotation;
    }
}


module.exports = { moveLeft, moveRight, rotate };