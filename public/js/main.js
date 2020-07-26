const testElem = document.getElementById('test');
const questionBtn = document.getElementById('newQ');
const questionOne = document.getElementById('question1');
const questionTwo = document.getElementById('question2');
const questionThree = document.getElementById('question3');
const questionFour = document.getElementById('question4');
const questionFive = document.getElementById('question5');
const answerBtn = document.getElementById('answer');

const socket = io();

let questionsArr = [];
// let questionsArr = ["This is an answer one", "This is an answer two", "This is an answer three", "This is an answer four", "This is an answer five"];

async function getNewQuestion() {
    let urlRandom = 'https://jservice.io/api/random';
    let urlCat = 'https://jservice.io/api/category?id=2155';

    fetch(urlCat)
    .then(response => {
        return response.json()
    })
    .then(data => { 
        console.log(data);
        for (var i = 0; i < 5; i++) {
            questionsArr[i] = data.clues[i];
        }
        // questionDiv.innerText = data[0].question;
    });

    // questionDiv.innerText = realData.question;
    // return realData.question;
}

// Question buttons
questionOne.addEventListener('click', () => {
    const ans = document.getElementById("answer1");
    ans.innerText = questionsArr[0].question;
});

questionTwo.addEventListener('click', () => {
    const ans = document.getElementById("answer2");
    ans.innerText = questionsArr[1].question;
});

questionThree.addEventListener('click', () => {
    const ans = document.getElementById("answer3");
    ans.innerText = questionsArr[2].question;
});

questionFour.addEventListener('click', () => {
    const ans = document.getElementById("answer4");
    ans.innerText = questionsArr[3].question;
});

questionFive.addEventListener('click', () => {
    const ans = document.getElementById("answer5");
    ans.innerText = questionsArr[4].question;
});

// TODO update to change all questions
questionBtn.addEventListener('click', () => {
    getNewQuestion();
});

answerBtn.addEventListener('click', () => {
    socket.emit('answer', 'Answer button pressed');
});

socket.on('answerPressed', msg => {
    console.log(msg);
    if (socket.id === msg) {
        console.log("Same id");
    } else {
        alertBtn.style.display = "none";
    }
    // alert(msg);
});