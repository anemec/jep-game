const testElem = document.getElementById('test');
const questionBtn = document.getElementById('newQ');
const questionOne = document.getElementById('question1');
const questionTwo = document.getElementById('question2');
const questionThree = document.getElementById('question3');
const questionFour = document.getElementById('question4');
const questionFive = document.getElementById('question5');
const answerBtn = document.getElementById('answer');
const answerText = document.getElementById('ansText');
const answerSubmit = document.getElementById('answerSubmit');
const answerNotPressed = document.getElementById('answerNotPressed');

const socket = io();

let questionsArr = [];
// let questionsArr = ["This is an answer one", "This is an answer two", "This is an answer three", "This is an answer four", "This is an answer five"];

// Question buttons
questionOne.addEventListener('click', () => {
    const ans = document.getElementById("answer1");
    ans.innerText = questionsArr[0].question;
    sendQuestion(ans.id, 0);
});

questionTwo.addEventListener('click', () => {
    const ans = document.getElementById("answer2");
    ans.innerText = questionsArr[1].question;
    sendQuestion(ans.id, 1);
});

questionThree.addEventListener('click', () => {
    const ans = document.getElementById("answer3");
    ans.innerText = questionsArr[2].question;
    sendQuestion(ans.id, 2);
});

questionFour.addEventListener('click', () => {
    const ans = document.getElementById("answer4");
    ans.innerText = questionsArr[3].question;
    sendQuestion(ans.id, 3);
});

questionFive.addEventListener('click', () => {
    const ans = document.getElementById("answer5");
    ans.innerText = questionsArr[4].question;
    sendQuestion(ans.id, 4);
});

// Set up questions
socket.on('qUpdate', msg => {
    questionsArr = msg;    
});

function sendQuestion(id, count) {
    socket.emit('questionNumber', id, count);
}

socket.on('qPressed', (id, count) => {
    console.log(id, count);
    const ans = document.getElementById(id);

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
    console.log(`answer pressed by user ${count}`);
    if (socket.id === id) {
        answerText.style.display = "inline";
        answerSubmit.style.display = "inline";
    } else {
        answerNotPressed.innerText = `User ${count} pressed answer`;
        answerNotPressed.style.display = "inline";
    }
    answerBtn.style.display = "none";
    
});

answerSubmit.addEventListener('click', () => {
    
});

answerText.addEventListener('submit', () => { console.log('submitted')});

socket.on('userAdded', msg => {
    console.log(msg);
})