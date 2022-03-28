const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

let path = require('path');

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

const PORT = 3042;
httpServer.listen(3042, () => {
    console.log('Listening on *:' + PORT);
});