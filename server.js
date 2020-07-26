const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    // console.log(`New connection from ${socket.id}`);
    socket.on('answer', msg => {
        console.log(msg);
        io.emit('answerPressed', socket.id);
    });

});


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));