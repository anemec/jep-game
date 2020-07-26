const testElem = document.getElementById('test');
const questionBtn = document.getElementById('newQ');
const questionDiv = document.getElementById('question');
const alertBtn = document.getElementById('answer');

const socket = io();

async function getNewQuestion() {
    let url = 'https://jservice.io/api/random'
    // let response = await fetch(url);

    // let data = await response.json();
    // console.log(data[0]);
    // let realData = data[0];
    fetch(url)
    .then(response => {
        return response.json()
    })
    .then(data => { 
        console.log(data[0]);
        questionDiv.innerText = data[0].question;
    });

    // questionDiv.innerText = realData.question;
    // return realData.question;
}

questionBtn.addEventListener('click', () => {
    getNewQuestion();
});

alertBtn.addEventListener('click', () => {
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