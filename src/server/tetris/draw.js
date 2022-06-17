const consts = require("../const");
const EmptyMap = require("../maps/maps").empty;

function draw(map, x, y, piece, drawFunc) {
    for (let i = 0; i < piece.length; i++) {
        // Do not draw if the line is empty
        if (!piece[i].every(val => val == 0)) {
            // Do not draw pieces that are above the board
            if (y + i < 0)
                continue;

            const drew = drawFunc(map, piece[i], x, y + i);

            if (drew != consts.PIECE_DREW) {
                return drew;
            }
        }
    }

    return consts.PIECE_DREW;
}

function placeLine(map, line, x, y) {
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
    if (x < 0 || x >= EmptyMap[0].length)
        return false;
    if (y >= EmptyMap.length)
        return false;
    return true;
}

function testDraw(map, x, y, piece, BREAK_IF_CELL_OFF_LIMITS = false) {
    for (let j = 0; j < piece.length; j++) {
        if (piece[j].every(val => val == 0))
            continue;

        for (let i = 0; i < piece[j].length; i++) {
            if (piece[j][i] === 0 || (!BREAK_IF_CELL_OFF_LIMITS && y + j < 0))
                continue;
            else if (piece[j][i] !== 0 && BREAK_IF_CELL_OFF_LIMITS && y + j < 0)
                return consts.MOVE_NOT_PERMITTED;

            if (!coordinatesOk(x + i, y + j) || map[y + j][x + i] != 0)
                return consts.MOVE_NOT_PERMITTED;
        }
    }

    return consts.PIECE_DREW;
}

module.exports = { draw, placeLine, eraseLine, testDraw }; 