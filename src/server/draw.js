const consts = require("./const");

// TODO: Handle the empty column on the piece during for the rotation
// TODO: See what's the problem when going to the right
function draw(player, piece, drawFunc) {
    const emptyLine = piece[0].every(val => val == 0) ? 1 : 0;

    for (let i = 0; i < piece.length; i++) {
        // Do not draw if the line is empty
        if (!piece[i].every(val => val == 0)) {
            const drew = drawFunc(player.map, piece[i], player.currentPieceX, player.currentPieceY - emptyLine + i);
            if (drew != 0)
                return drew;
        }
    }

    return consts.PIECE_DREW;
}

function placeLine(map, line, x, y) {
    for (let i = 0; i < line.length; i++) {
        if (line[i] == 0 || !coordinatesOk(x + i, y))
            continue;
        if (map[y][x + i] != 0)
            return consts.MOVE_NOT_PERMITTED;
        else {
            console.log("[" + y + "][" + (x + i) + "] drew");
            map[y][x + i] = line[i];
        }
    }

    return consts.PIECE_DREW;
}

function eraseLine(map, line, x, y) {
    for (let i = 0; i < line.length; i++) {
        if (line[i] == 0 || !coordinatesOk(x + i, y))
            continue;
        else
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