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

let questionsArr;
let currentQuestion;

io.on('connection', async (socket) => {
    if (!questionsArr) {
        questionsArr = await getNewQuestions();
    }
    io.emit('qUpdate', questionsArr);

    const user = addUser(socket.id, "user");

    socket.emit('userAdded', `User added ${user.username}${user.count}`);

    socket.on('answer', msg => {
        io.emit('answerPressed', user.id, user.count);
    });

    socket.on('questionNumber', (id, count) => {
        currentQuestion = questionsArr[count];
        io.emit('qPressed', id, count);
    });

    socket.on('userAnswer', answer => {
        let isAnswerCorrect = answer.toLowerCase() === currentQuestion.answer.toLowerCase();
        io.emit('questionAnswered', isAnswerCorrect ? true : false, user);
    });

    socket.on('getQuestions', async () => {
        //is await needed?
        let arr = await getNewQuestions();
        questionsArr = arr;
        io.emit('qUpdate', arr);
    });

});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));