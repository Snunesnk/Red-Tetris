function addUnbreakableLines(game, playerId, lineCleared, socket) {
    game.players.map(player => {
        if (player.socketId == playerId) {
            console.log("Same player, skip !");
            return;
        }

        console.log("He he poor " + player.socketId);
        console.log("lineCleared: " + lineCleared);
        // Remove the first line of the map, 
        // and add an unbreakable line at the end
        let i = 0;
        while (i < lineCleared) {
            player.map.splice(0, 1);
            player.map.push([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
            player.currentPieceY -= 1;
            player.currentSpecterY -= 1;
            i++;
        }

        player.needsUpdate = true;
    });
}

module.exports = { addUnbreakableLines };