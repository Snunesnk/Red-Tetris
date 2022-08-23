const { STATUS } = require("../../const");
const editGame = require("../Game/edit");

function gameOver(game, socket, io) {
    // Check if there's only one player left max,
    // and if so declare him the winner
    const playingPlayers = game.players.filter(player => !player.isOver);

    // all players losed (write little leaderboard on front ?)
    if (playingPlayers.length <= 1) {
        // Get remaining player's socket to set him as the winner
        if (playingPlayers.length === 1) {
            io.sockets.sockets.get(playingPlayers[0].socketId).emit("game:won");
            playingPlayers[0].isOver = true;
        }

        game.status = STATUS.END_GAME;
        editGame(game, io);
    }

    socket.emit("game:over");
}

module.exports = gameOver;