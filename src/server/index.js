const express = require("express");
const { createServer, get } = require("http");
const initSocket = require("./Socket/socket");
const app = express();
const httpServer = createServer(app);
const connectDB = require("./db/db");
let path = require("path");
const { getTopTenScores } = require("./db/queries");

// connectDB().then((client) => {
//   console.log("Connected to MongoDB");
//   client.close();
// });

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

// DATABASE
app.get("/getTopTenScores", (req, res) => {
  // getTopTenScores(res);
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
