// Maybe I can implement a move queue, as long as there are move this function is triggered, plus 
// Every X time this function is also triggered, it has to corresponds with the time when the gravity
// is applied 
function handleGame(game, player, move = null, socket) {
    // Handle gravity.
    handleGravity(game);

    // Handle input.
    handleMove(obj, move);

    // Check for cleared lines
    player.lineCleared = checkLines(obj);

    // Maybe for a bonus
    // calculateScore(obj, lines_cleared);


    socket.emit(test);
    // Return the updated map, plus a "End" message if it's game over or a win
    return !tg_game_over(obj);
}

async function tetris(game, player, socket) {
    while (!player.isOver) {
        if (player.moveQueue.length > 0) {
            for (let i = 0; i < player.moveQueue.length; i++) {
                await handleGame(game, player, player.moveQueue[i]);
            }
        }
        else
            await handleGame(game, player);

        // while ()
    }

    // Wait until it's time for another gravity appliance or if a move
    // has been added to the queue
}

module.exports = tetris;