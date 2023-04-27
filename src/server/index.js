const express = require("express");
const { createServer } = require("http");
const initSocket = require("./Socket/socket");
let path = require("path");
const initDb = require("./db");

initDb();

const app = express();
const httpServer = createServer(app);

// On connexion to the page, returns the HTML code
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/index.html"));
});

// Return the bundle.js, containing all js files
app.get("/bundle.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/bundle.js"));
});
// Return the bundle.js, containing all js files
app.get("/korobeiniki.mp3", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/korobeiniki.mp3"));
});
// Return the font
app.get("/BarcadeBrawl.ttf", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public/BarcadeBrawl.ttf"));
});

// Catch eevery thing else
app.get("*", (req, res) => {
  console.log("page do not exist");
  console.log("retrieving page: " + req.params.pageCalled);
});

const PORT = process.env.PORT || 3042;
const server = httpServer.listen(PORT, () => {
  console.log("Listening on *:" + PORT);
});

const io = initSocket(server);

module.exports = io;
