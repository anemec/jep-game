const fetch = require('node-fetch');

// function getNewQ() {
//     return fetch('https://jservice.io/api/random')
//     .then(res => res.json())
//     .then(data => { return data.question});
// }

function getNewQuestions() {
    // let questionsArr = [];
    let urlRandom = 'https://jservice.io/api/random';
    let urlCat = 'https://jservice.io/api/category?id=2155';

    return fetch(urlCat)
    .then(response => {
        return response.json()
    })
    .then(data => { 
        // console.log(data);
        let questionsArr = [];
        for (var i = 0; i < 5; i++) {
            questionsArr[i] = data.clues[i];
        }
        // console.log(questionsArr);
        return questionsArr;
        // questionDiv.innerText = data[0].question;
    });

    // questionDiv.innerText = realData.question;
    // return questionsArr;
}

module.exports = getNewQuestions