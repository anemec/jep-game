const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const { addUser, getUser, deleteUser } = require("./utils/users");
const getNewQuestions = require("./utils/questions");
const { response } = require("express");
// const fetch = require("node-fetch");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// let questionArr = [];

io.on('connection', socket => {

    const user = addUser(socket.id, "user");

    socket.emit('userAdded', `User added ${user.username}${user.count}`);

    socket.on('answer', msg => {
        console.log(msg);
        io.emit('answerPressed', user.id, user.count);
    });

    socket.on('questionNumber', (id, count) => {
        console.log(`id:${id} count:${count}`);
        io.emit('qPressed', id, count);
    });

    socket.on('getQuestions', async () => {
        let arr = await getNewQuestions();
        io.emit('qUpdate', arr);
    });

});

// async function fetchQ() {
//     let questionArr =  await getNewQuestions();
//     io.emit('qUpdate', questionArr);
// }


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));