const consts = require("./const");

function draw(player, piece, drawFunc) {
    for (let i = 0; i < piece.length; i++) {
        // Do not draw if the line is empty
        if (!piece[i].every(val => val == 0)) {
            const drew = drawFunc(player.map, piece[i], player.currentPieceX, player.currentPieceY + i);
            // If the draw fail for this line, remove all previously placed lines
            if (drew != 0) {
                console.log("line " + i + " failed");
                i--;
                for (i; i >= 0; i--) {
                    eraseLine(player.map, piece[i], player.currentPieceX, player.currentPieceY + i)
                }
                return drew;
            }
        }
    }

    if (message.length > 0)
        console.log(message);

    return consts.PIECE_DREW;
}

function placeLine(map, line, x, y) {
    for (let i = 0; i < line.length; i++) {
        if (line[i] == 0)
            continue;
        if ((line[i] != 0 && !coordinatesOk(x + i, y)) || map[y][x + i] != 0)
            return consts.MOVE_NOT_PERMITTED;
    }

    // Everything seems fine, put the piece
    for (let i = 0; i < line.length; i++) {
        if (line[i] == 0)
            continue;
        else {
            map[y][x + i] = line[i];
        }
    }

    return consts.PIECE_DREW;
}

function eraseLine(map, line, x, y) {
    for (let i = 0; i < line.length; i++) {
        if (line[i] == 0 || !coordinatesOk(x + i, y))
            continue;
        else if (map[y][x + i] == line[i])
            map[y][x + i] = 0
    }

    return consts.PIECE_DREW;
}

function coordinatesOk(x, y) {
    if (x < 0 || x >= consts.defaultMap[0].length)
        return false;
    if (y < 0 || y >= consts.defaultMap.length)
        return false;
    return true;
}

module.exports = { draw, placeLine, eraseLine };