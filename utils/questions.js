const fetch = require('node-fetch');

async function getNewQuestions() {
    let questionArray = [];

    for(let i = 0; i < 5; i++) {
        //Push could be used for a 2d array
        questionArray = questionArray.concat(await populateColumn());
    }
    return questionArray;
}

function populateColumn() {
    const url = 'https://jservice.io/api/';
    const category = 'category?id=';

    let id = getRandomInt(10000);

    let catUrl = url + category + id;

    return fetch(catUrl)
    .then(response => {
        return response.json();
    })
    .then(data => { 
        let questionsArr = [];
        for (var i = 0; i < 5; i++) {
            questionsArr[i] = data.clues[i];
        }
        return questionsArr;
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = getNewQuestions