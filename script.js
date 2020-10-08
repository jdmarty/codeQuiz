import { htmlQuestions } from './questions.js'

$(document).ready(function () {
//-------------------------------------------------------------------------

    //global variables
    var questions = null;
    var qNumber = 0;
    var score = 0;

    //Base DOM elements
    var $questionBox = $("#questionBox");
    var $answersBox = $("#answersBox");
    var $buttonBox = $("#buttonBox");

    //function to write the start buttons row
    function writeStartButtons() {
        $buttonBox.show();
        var startButtons = [
            {id: 'htmlStart',text: 'HTML'},
            {id: 'cssStart', text: 'CSS'},
            {id: 'jsStart', text: 'JavaScript'},
            {id: 'jqStart', text: 'jQuery'},
        ];
        $buttonBox.append('<h2>Pick Your Topic</h2>')
        for (var button of startButtons) {
            let newStartButton = $('<button>');
            newStartButton.attr('id', button.id);
            newStartButton.attr('class', 'btn btn-primary btn-lg mx-1');
            newStartButton.attr('type', 'button');
            newStartButton.text(button.text);
            $buttonBox.append(newStartButton);
        }
    }
    writeStartButtons();

    //function to write the welcome message
    function writeWelcome() {
        $questionBox.empty()
        $questionBox.append('<h1 class="display-4">Welcome to Code Quiz!</h1>')
        $questionBox.append('<p class="lead">Answer every question before time runs out. The faster you answer, the higher your score!</p>');
    }
    writeWelcome()

    //function to update the questions box<
    function loadQuestion(questions, qNumber) {
        var currentQuestion = questions[qNumber];
        //hide the buttons
        $buttonBox.hide();
        //display the answers
        $answersBox.show();
        //update the questions box
        $questionBox.html(`<p class="lead">${currentQuestion.question}</p>`);
        //empty out the answers box
        $answersBox.empty();
        for (var i=0; i < currentQuestion.answers.length; i++) {
        //create a new div with appropriate classes
        var newAnswerCard = $('<div class="card text-center my-2 answer">');
        $answersBox.append(newAnswerCard);
        //create a new div for the text
        var newAnswerCardBody = $(`<div class="card-body"></div>`);
        newAnswerCardBody.on("click", nextQuestion);
        if (i === currentQuestion.correct) newAnswerCardBody.attr('data-correct', true)
        newAnswerCardBody.text(currentQuestion.answers[i]);
        //append it to the new card
        newAnswerCard.append(newAnswerCardBody);
        }
    }

    //function to load in the appropriate quiz
    $("#buttonBox").on("click", function (e) {
        if (!e.target.matches("button")) return;
        var quizType = e.target.id;
        switch (quizType) {
        case "htmlStart":
            questions = htmlQuestions;
            break;
        case "cssStart":
            questions = htmlQuestions;
            break;
        case "jsStart":
            questions = htmlQuestions;
            break;
        case "jqStart":
            questions = htmlQuestions;
            break;
        }
        loadQuestion(questions, qNumber);
    });

    //function to load the next question
    function nextQuestion(e) {
        var isCorrect = e.target.getAttribute("data-correct")
        if (isCorrect) alert('That\'s right!')
        qNumber++
        if (qNumber < questions.length) loadQuestion(questions, qNumber);
    }

//-----------------------------------------------------------------------------------------
});

