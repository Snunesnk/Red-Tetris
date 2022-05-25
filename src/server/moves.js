const { draw, placeLine, eraseLine } = require("./draw");

function moveLeft(player, piece) {
    const offset = getLeftOffset(piece);

    if (player.currentPieceX > 0 - offset) {
        draw(player, piece, eraseLine);
        player.currentPieceX -= 1;
        draw(player, piece, placeLine);
    }
}

function moveRight(player, piece) {
    const offset = getRightOffset(piece);

    if (player.currentPieceX + piece[0].length < player.map[0].length + offset) {
        draw(player, piece, eraseLine);
        player.currentPieceX += 1;
        draw(player, piece, placeLine);
    }
}

function rotate(game, player, piece) {
    draw(player, piece, eraseLine);
    const prevRotation = player.currentPieceRotation;

    player.currentPieceRotation = (player.currentPieceRotation + 1) % 4;

    piece = game.pieces[player.currentPiece].content[player.currentPieceRotation];

    // I need to check if with the rotation some part of the piece are inside the walls or not,
    // and if so I have to make them "bounce"
    const leftOffset = getLeftOffset(piece);
    const rightOffset = getRightOffset(piece);

    if (player.currentPieceX + leftOffset < 0)
        player.currentPieceX = 0;
    if (player.currentPieceX + piece[0].length - rightOffset > player.map[0].length)
        player.currentPieceX = player.map[0].length - piece[0].length

    // Check also for the bottom of the map

    if (draw(player, piece, placeLine) != 0) {
        player.currentPieceRotation = prevRotation;
        piece = game.pieces[player.currentPiece].content[player.currentPieceRotation];
    }
}

// Maybe I can integrate them to the "piece" class
function getLeftOffset(piece) {
    let offset = 0;

    for (let i = 0; i < piece[0].length - 1; i++) {
        for (let j = 0; j < piece.length - 1; j++) {
            if (piece[j][i] != 0)
                return offset;
        }

        offset++;
    }

    return offset;
}
function getRightOffset(piece) {
    let offset = 0;

    for (let i = piece[0].length - 1; i >= 0; i--) {
        for (let j = piece.length - 1; j >= 0; j--) {
            if (piece[j][i] != 0)
                return offset;
        }

        offset++;
    }

    return offset;
}


module.exports = { moveLeft, moveRight, rotate };