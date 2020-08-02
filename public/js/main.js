const questionBtn = document.getElementById('newQ');
const questions = document.querySelectorAll('.question-div');
const answerBtn = document.getElementById('answer');
const answerText = document.getElementById('ansText');
const answerSubmit = document.getElementById('answerSubmit');
const answerNotPressed = document.getElementById('answerNotPressed');

const socket = io();

let questionsArr = [];
// let questionsArr = ["This is an answer one", "This is an answer two", "This is an answer three", "This is an answer four", "This is an answer five"];

function handleQuestion(item, index) {
    sendQuestion(item.id, index);
}

questions.forEach((item, index) => {
    item.children[0].addEventListener('click', () => {
        handleQuestion(item.children[1], index);
    });
});

// Set up questions
socket.on('qUpdate', msg => {
    questionsArr = msg;    
});

function sendQuestion(id, count) {
    socket.emit('questionNumber', id, count);
}

socket.on('qPressed', (id, count) => {
    const ans = document.getElementById(id);
    // Disable other questions until current is answered
    questions.forEach(item => {
        item.children[0].style.pointerEvents = "none";
    });
    ans.innerText = questionsArr[count].question;
});

// TODO update to change all questions
questionBtn.addEventListener('click', () => {
    // getNewQuestion();
    socket.emit('getQuestions', 'test msg');
});

answerBtn.addEventListener('click', () => {
    socket.emit('answer', 'Answer button pressed');
});

socket.on('answerPressed', (id, count) => {
    let userAnswering = socket.id === id;
    handleAnswerDisplay(userAnswering, count);
});

answerSubmit.addEventListener('click', () => {
    // Check text here?
    socket.emit('userAnswer', answerText.value);    
});

socket.on('questionAnswered', (isCorrect, user) => {
    if (socket.id === user.id) {
        answerText.style.display = "none";
        answerSubmit.style.display = "none";
        answerNotPressed.innerText = `Your answer was ${isCorrect ? 'correct' : 'incorrect'}`;
        answerNotPressed.style.display = "inline";
    } else {
        answerNotPressed.innerText = `User ${user.count} was ${isCorrect ? 'correct' : 'incorrect'}`;
        answerNotPressed.style.display = "inline";
    }
    answerBtn.style.display = "inline";
});

function handleAnswerDisplay(userAnswering, count) {
    if (userAnswering) {
        answerText.style.display = "inline";
        answerSubmit.style.display = "inline";
    } else {
        answerNotPressed.innerText = `User ${count} pressed answer`;
        answerNotPressed.style.display = "inline";
    }
    answerBtn.style.display = "none";
}

