const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const allMoves = require("./moves");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3042",
        methods: ["GET", "POST"]
    }
});

let path = require("path");
const Game = require("./game");

function f(value) {
    console.log(value.content);
}

io.on("connection", (socket) => {
    socket.on("move", key => { allMoves.moves(key); });
});

// On connexion to the page, returns the HTML code
app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/index.html"));
});

// Return the bundle.js, containing all js files
app.get("/bundle.js", (req, res) => {
    res.sendFile(path.resolve("public/bundle.js"));
});

const PORT = 3000;
httpServer.listen(3000, () => {
    console.log('Listening on *:' + PORT);
});

const Games = [new Game("firstGame")];
Games[0].pieces.map(f);

module.exports = Game;