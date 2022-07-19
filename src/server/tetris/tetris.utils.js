const { draw, placeLine, eraseLine, testDraw } = require("./draw");
const consts = require("../const");

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

module.exports = { hasHitBottom, drawPieceSpecter, erasePieceSpecter };