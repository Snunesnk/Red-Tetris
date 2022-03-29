const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

let path = require('path');
const Game = require('./game');

function f(value) {
    console.log(value.content); 
}

io.on("connection", socket => {
    // either with send()  
    socket.send("Hello Client I'm server!");
    // or with emit() and custom event names  
    socket.emit("greetings", "Hey Client!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));
    // handle the event sent with socket.send()  
    socket.on("message", (data) => { console.log(data); });
    // handle the event sent with socket.emit()  
    socket.on("salutations", (elem1, elem2, elem3) => { console.log(elem1, elem2, elem3); });

    socket.emit("my-test");

    socket.on("my-test", () => {
        console.log("This is my test !");
    })
});

// On connexion to the page, returns the HTML code
app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});

// Return the bundle.js, containing all js files
app.get('/bundle.js', (req, res) => {
    res.sendFile(path.resolve('public/bundle.js'));
});

httpServer.listen(3000, () => {
    console.log('Listening on *:3000');
});

const firstGame = new Game;
firstGame.pieces.map(f);