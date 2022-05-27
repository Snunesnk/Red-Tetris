const { draw, placeLine, eraseLine } = require("./draw");
const { NORMAL_ROTATION, I_ROTATION } = require("./const");

function moveLeft(player, piece) {
    const offset = getLeftOffset(piece);
    let moveOk = true;

    if (player.currentPieceX <= 0 - offset)
        return;

    // Find the first block on each line, then check if the place just before on the map
    // is free or not 
    piece.forEach((line, index) => {
        const mapY = player.currentPieceY + index;

        if (!moveOk || mapY >= player.map.length)
            return;


        let blockIndex = line.findIndex(elem => elem != 0);
        if (blockIndex == -1) {
            return;
        }

        const mapX = player.currentPieceX + blockIndex - 1;

        // Check on the map
        if (player.map[mapY][mapX] != 0)
            moveOk = false;
    });

    if (moveOk) {
        draw(player, piece, eraseLine);
        player.currentPieceX -= 1;
        draw(player, piece, placeLine);
    }
}

function moveRight(player, piece) {
    const offset = getRightOffset(piece);
    let moveOk = true;

    if (player.currentPieceX + piece[0].length - offset >= player.map[0].length) {
        return;
    }

    // Find the first block on each line, then check if the place just after on the map
    // is free or not 
    piece.forEach((line, index) => {
        const mapY = player.currentPieceY + index;

        if (!moveOk || mapY >= player.map.length)
            return;

        let blockIndex = line.reverse().findIndex(elem => elem != 0);
        line.reverse();
        if (blockIndex == -1) {
            return;
        }

        const mapX = player.currentPieceX + (3 - blockIndex) + 1;

        // Check on the map
        if (player.map[mapY][mapX] != 0) {
            moveOk = false;
        }

    });

    if (moveOk) {
        draw(player, piece, eraseLine);
        player.currentPieceX += 1;
        draw(player, piece, placeLine);
    }
}

function rotate(game, player, piece, rotIndex) {
    draw(player, piece.content[player.currentPieceRotation], eraseLine);
    const prevRotation = player.currentPieceRotation;
    const prevX = player.currentPieceX;
    const prevY = player.currentPieceY;

    player.currentPieceRotation = (player.currentPieceRotation + 1) % 4;

    piece = game.pieces[player.currentPiece];

    // I need to check if with the rotation some part of the piece are inside the walls or not,
    // and if so I have to make them "bounce"
    const leftOffset = getLeftOffset(piece.content[player.currentPieceRotation]);
    const rightOffset = getRightOffset(piece.content[player.currentPieceRotation]);

    if (player.currentPieceX + leftOffset < 0)
        player.currentPieceX = 0;
    if (player.currentPieceX + piece.content[player.currentPieceRotation][0].length - rightOffset > player.map[0].length)
        player.currentPieceX = player.map[0].length - piece[0].length

    // Perform the appropriate translation for this attempt
    // I piece
    if (piece.type == 0) {
        player.currentPieceX += I_ROTATION[rotIndex].x;
        player.currentPieceY += I_ROTATION[rotIndex].y;
    }
    // Other pieces
    else {
        player.currentPieceX += NORMAL_ROTATION[rotIndex].x;
        player.currentPieceY += NORMAL_ROTATION[rotIndex].y;
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