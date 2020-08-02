const questionBtn = document.getElementById('newQ');

questionBtn.addEventListener('click', () => {
    // getNewQuestion();
    socket.emit('getQuestions', 'test msg');
});