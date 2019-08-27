const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set port
const port = process.env.PORT || 3000;
//set public directory
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

//set socket io
io.on('connection', () => {
    console.log('Connect Web Socket')
});

//set server
server.listen(port, () => {
    console.log(`Server in up on port ${port}`);
});