//questions array
var htmlQuestions = [
    {
        question: 'Which of these elements displays inline by default?',
        answers: [
            'p', 
            'div', 
            'span', 
            'h1'],
        correct: 3
    },
    {
        question: 'What is the correct way to add a 2px margin to a div using inline styling?',
        answers: [
            '<div style="margin: 2px"</div', 
            '<div>style=margin: 2px</div',
            '<div margin="2px"</div',
            '<div style="2px"></div'
        ],
        correct: 1
    },
    {
        question: 'Which of these is a tag that will make text appear bold?',
        answers: [
            '<bold>', 
            '<em>',
            '<div class="bold">',
            '<strong>'
        ],
        correct: 4
    }
];

//standard divs
var $answersBox = $('.answersBox');
var $answerCard = $('<div class="card text-center my-2">');
var $answerCardBody = $('<div class="card-body">');

//function to update the questions box
function updateQuestion(questions, qNumber) {
    $('#questionBox').html(`<p class="lead">${questions[qNumber].question}</p>`);
    $answersBox.empty();
    for (let answer of questions[qNumber].answers) {
        let newAnswerCard = $('<div class="card text-center my-2">');
        $answersBox.append(newAnswerCard);
        let newAnswerCardBody = $(`<div class="card-body">${answer}</div>`);
        newAnswerCard.append(newAnswerCardBody);
    }
};

updateQuestion(htmlQuestions, 0);