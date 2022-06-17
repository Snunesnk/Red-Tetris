// Calculate the last action score.
// Score for cleared lines: 
//   - 1 line: 100 (Single)
//   - 2 lines: 300 (Double)
//   - 3 lines: 500 (Triple)
//   - 4 lines: 800 (Tetris)
//
// Score for cleared lines with T-spin:
//   - 0 lines: 400
//   - 1 lines: 800
//   - 2 lines: 1200
//   - 3 lines: 1600
//
// Score for B2B (back to back) cleared lines:
//   - B2B Tetris / B2B T-spin single: 1200
//   - B2B T-spin double: 1800
//   - B2B T-spin triple: 2400
// A B2B line clear is when two lines are cleared with difficult moves, without any
// "easy" move in between.
// Are considered a "difficult" move the T-spin and the Tetris (4 lines cleared)
//
// Score for combo (if implemented):
//   - move value + 50
//
// Score for drop: 
//   - Soft drop: 1 // Not sure hot to implement
//   - Hard drop: 1 * NB_CELLS // Implemented within the hard drop movment function
//
// Then the final score is multiplied by the player lever to get the definitive player score
// with its last action
//
// T-spin: A T-spin is when the last action of one T shaped tetrimino was a rotation
//         (no move right or left), and that at least 3 cells in the diagonal of the
//         tetriminos center are filled.
//   Ex:
//          000X0   here, the T tetrimino has 3 blocks at the diagonal of its center 
//          0TTT0   s if its last move was a rotatation, it's a T-spin
//          0XTX0
function calculateScore(player, clearedLines, Tspin) {
    let score = 0;

    // Proceed by steps
    switch (clearedLines) {
        // TETRIS
        case 4:
            if (player.b2bClear == true) {
                score = 1200;
            }
            else {
                score = 800;
                player.b2bClear = true;
            }
            break;

        // TRIPLE
        case 3:
            if (player.b2bClear == true && Tspin) {
                score = 2400;
            }
            else if (Tspin) {
                score = 1600;
                player.b2bClear = true;
            }
            else {
                score = 500;
            }
            break;

        // DOUBLE
        case 2:
            if (player.b2bClear == true && Tspin) {
                score = 1800;
            }
            else if (Tspin) {
                score = 1200;
                player.b2bClear = true;
            }
            else {
                score = 300;
            }
            break;

        // SINGLE
        case 1:
            if (player.b2bClear == true && Tspin) {
                score = 1200;
            }
            else if (Tspin) {
                score = 800;
                player.b2bClear = true;
            }
            else {
                score = 100;
            }
            break;

        // NONE
        case 0:
            if (Tspin) {
                score = 400;
            }
            break;
    }

    player.lineCleared += clearedLines;
    player.score += score * player.level;

    // Increase the level if the score is sufficient
    if (player.score >= player.level * player.level * 2000) {
        console.log("New level !");
        player.increaseLevel();
    }

    return score;
}

// For a move to be a T-spin, the piece must be a T tetrimino
// The piece must be integrated to the "tas"
// The last move must be a rotation
// At least 3 of the 4 blocks diagonally around the center of the tetrimino must be filled
function isTspin(player, pieceType) {
    // Check for T tetrimono
    if (pieceType != 5)
        return false;

    // Check if the piece is integrated or not
    if (!player.needNewPiece)
        return false;

    // Check if the last move was indeed a rotation
    for (let i = player.moveHistory.length - 1; i >= 0; i--) {
        // Do not count drop as actual moves
        if (player.moveHistory[i] === " " || player.moveHistory[i] === "ArrowDown")
            continue;

        if (player.moveHistory[i] === "ArrowLeft" || player.moveHistory[i] === "ArrowRight")
            return false;

        if (i === 0 && player.moveHistory[i] !== "ArrowUp")
            return false;
    }

    // Check that at least 3 corners are filled.
    let cornerFilled = 0;
    // Because this is a T tetriminos, the coordinates for the corner are
    // as follow (Starting from the piece's [x, y] coordinates):
    // [0, 0]
    if (player.map[player.currentPieceY][player.currentPieceX] !== 0) {
        cornerFilled += 1;
    }
    // [2, 0]
    if (player.map[player.currentPieceY][player.currentPieceX + 2] !== 0) {
        cornerFilled += 1;
    }
    // [0, 2]
    if (player.map[player.currentPieceY + 2][player.currentPieceX] !== 0) {
        cornerFilled += 1;
    }
    // [2, 2]
    if (player.map[player.currentPieceY + 2][player.currentPieceX + 2] !== 0) {
        cornerFilled += 1;
    }

    return cornerFilled >= 3;
}

module.exports = { calculateScore, isTspin };