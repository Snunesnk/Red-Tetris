const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const {Server} = require('socket.io');
const io = new Server(server);

let path = require('path');

// On connexion to the page, returns the HTML code
app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});

// Return the bundle.js, containing all js files
app.get('/bundle.js', (req, res) => {
    res.sendFile(path.resolve('public/bundle.js'));
});

io.on('connexion', (socket) => {
    console.log('A user is connected');
});

server.listen(3000, () => {
    console.log('Listening on *:3000');
});