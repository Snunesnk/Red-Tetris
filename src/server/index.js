const express = require("express");
const { createServer } = require("http");

const initSocket = require("./Socket/socket");

const app = express();
const httpServer = createServer(app);
const io = initSocket(httpServer);

let path = require("path");
const Game = require("./game");

function f(value) {
    console.log(value.content);
}

// On connexion to the page, returns the HTML code
app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/index.html"));
});

// Return the bundle.js, containing all js files
app.get("/bundle.js", (req, res) => {
    res.sendFile(path.resolve("public/bundle.js"));
});
// Return the font
app.get("/BarcadeBrawl.ttf", (req, res) => {
    res.sendFile(path.resolve("public/BarcadeBrawl.ttf"));
});


httpServer.listen(3042, () => {
    console.log("Listening on *:" + PORT);
});

module.exports = io;
