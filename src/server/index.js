const express = require("express");
const { createServer } = require("http");

const initSocket = require("./Socket/socket");

const app = express();
const httpServer = createServer(app);

let path = require("path");
const Game = require("./game");

function f(value) {
    console.log(value.content);
}

// On connexion to the page, returns the HTML code
app.get("/", (req, res) => {
    console.log("path: " + path.resolve(__dirname, '../../public/index.html'));
    res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});

// Return the bundle.js, containing all js files
app.get("/bundle.js", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/bundle.js'));
});
// Return the font
app.get("/BarcadeBrawl.ttf", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/BarcadeBrawl.ttf'));
});

const PORT = process.env.PORT || 3042
const server = httpServer.listen(PORT, () => {
    console.log("Listening on *:" + PORT);
});

const io = initSocket(server);


module.exports = io;
