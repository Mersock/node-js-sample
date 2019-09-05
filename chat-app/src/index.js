const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/message');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set port
const port = process.env.PORT || 3000;
//set public directory
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

let count = 0;
//set socket io
io.on('connection', (socket) => {
    console.log('Connect Web Socket');

    // socket.emit('countUpdated', count);


    // socket.on('increment', () => {
    //     count++
    //     socket.emit('countUpdated', count);
    //     io.emit('countUpdated', count)
    // })

    socket.on('join', ({ username, room }) => {
        socket.join(room);

        socket.emit('message', generateMessage('Welcome!'));
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`));

        //socket.emit , io.emit, socket.broadcast.emit
        //io.to.emit, socket.broadcast.to.emit
    });

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed');
        }

        io.emit('message', generateMessage(message));
        callback()
    });

    socket.on('sendLocation', (position, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${position.latitude},${position.longitude}`));
        callback();
    })

    socket.on('disconnect', () => {
        io.to(`Center City`).emit('message', generateMessage('User has left!'))
    });
});

//set server
server.listen(port, () => {
    console.log(`Server in up on port ${port}`);
});