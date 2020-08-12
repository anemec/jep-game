const questionBtn = document.getElementById('newQ');
const questions = document.querySelectorAll('.question');
const answerBtn = document.getElementById('answer');
const answerText = document.getElementById('ansText');
const answerSubmit = document.getElementById('answerSubmit');
const answerNotPressed = document.getElementById('answerNotPressed');
const questionText = document.getElementById("questionText");

const socket = io();

let questionsArr = [];
// let questionsArr = ["This is an answer one", "This is an answer two", "This is an answer three", "This is an answer four", "This is an answer five"];

// Setup click event for question boxes
questions.forEach((item, index) => {
    item.addEventListener('click', () => {
        sendQuestion(index);
    });
});

// Setup questions for all users
socket.on('qUpdate', msg => {
    questionsArr = msg;    
});

// Handle question selection
function sendQuestion(index) {
    socket.emit('questionNumber', index);
}

socket.on('qPressed', index => {
    // const ans = document.getElementById(id);
    // Disable other questions until current is answered
    questions.forEach(item => {
        item.style.pointerEvents = "none";
    });
    questionText.innerText = questionsArr[index].question;
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

socket.on('questionAnswered', (isCorrect, user, answer) => {
    if (socket.id === user.id) {
        answerText.style.display = "none";
        answerSubmit.style.display = "none";
        answerNotPressed.innerText = `Your answer was ${isCorrect ? 'correct' : 'incorrect'}`;
        answerNotPressed.style.display = "inline";
    } else {
        answerNotPressed.innerText = `User ${user.count} was ${isCorrect ? 'correct' : 'incorrect'} with answer: ${answer}`;
        answerNotPressed.style.display = "inline";
        answerBtn.style.display = "inline";
    }
});

socket.on('timeLimit', () => {
    resetDisplay();
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

function resetDisplay() {
    answerBtn.style.display = "inline";
    answerText.style.display = "none";
    answerSubmit.style.display = "none";
    answerNotPressed.style.display = "none";
    questions.forEach(item => {
        item.style.pointerEvents = "auto";
    });
    questionText.innerText = "";

}

