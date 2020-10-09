import { htmlQuestions, cssQuestions, jsQuestions, jqQuestions } from './questions.js';

$(document).ready(function () {
//-------------------------------------------------------------------------

    //global variables
    var questions = null;
    var qNumber = 0;
    var timer = 10;
    var highScores = [
        {name: 'Josh', score: 1000},
        {name: 'Kyle', score: 50},
        {name: 'Ray', score: 49}
    ];
    var startButtons = [
      { id: "htmlStart", text: "HTML" },
      { id: "cssStart", text: "CSS" },
      { id: "jsStart", text: "JavaScript" },
      { id: "jqStart", text: "jQuery" },
    ];
    var interval

    //Base DOM elements
    var $questionBox = $("#questionBox");
    var $answersBox = $("#answersBox");
    var $buttonBox = $("#buttonBox");
    var $scoresBox = $('#scoresBox');
    var $scoresList = $('#scoresList')

    //start the app
    initialize()

    //function to write the start buttons row
    function writeStartButtons() {
        $buttonBox.empty();
        $buttonBox.show();
        $scoresBox.hide();
        $buttonBox.append('<h2>Pick Your Topic</h2>')
        for (var button of startButtons) {
            let newStartButton = $('<button>');
            newStartButton.attr('id', button.id);
            newStartButton.attr('class', 'btn btn-primary btn-lg mx-1');
            newStartButton.attr('type', 'button');
            newStartButton.text(button.text);
            newStartButton.on('click', loadQuiz);
            $buttonBox.append(newStartButton);
        }
    }

    //function to write the welcome message
    function writeWelcome() {
        $questionBox.empty()
        $questionBox.append('<h1 class="display-4">Welcome to Code Quiz!</h1>')
        $questionBox.append('<p class="lead">Answer every question before time runs out. The faster you answer, the higher your score!</p>');
    }

    //function to write the scores list
    function writeScores() {
        $answersBox.hide();
        $scoresBox.show();
        for (var person of highScores) {
            $scoresList.append(`<li>${person.name}: ${person.score}</li>`)
        }
    }

    //function to write end of quiz message
    function writeEndMessage() {
        $questionBox.empty()
        $questionBox.append('<h1 class="display-4">Pencils Down!</h1>')
        $questionBox.append('<p class="lead">How did you do?</p>');
        $buttonBox.empty().show();
        var replayButton = $("<button>");
        replayButton.attr("class", "btn btn-primary btn-lg mx-1");
        replayButton.attr("type", "button");
        replayButton.text("Play Again?");
        replayButton.on('click', initialize);
        $buttonBox.append(replayButton);
    }

    //function to update the questions box<
    function loadQuestion(questions, qNumber) {
        var currentQuestion = questions[qNumber];
        //hide the buttons and scores
        $buttonBox.hide();
        $scoresBox.hide();
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

    //function to load the appropriate quiz
    function loadQuiz(e) {
        var quizType = e.target.id;
        switch (quizType) {
            case "htmlStart":
                questions = htmlQuestions;
                break;
            case "cssStart":
                questions = cssQuestions;
                break;
            case "jsStart":
                questions = jsQuestions;
                break;
            case "jqStart":
                questions = jqQuestions;
                break;
        }
        loadQuestion(questions, qNumber);
        startTimer()
    }

    //function to load the next question
    function nextQuestion(e) {
        var isCorrect = e.target.getAttribute("data-correct")
        if (isCorrect) alert('That\'s right!')
        qNumber++
        if (qNumber < questions.length) {
            loadQuestion(questions, qNumber);
        } else {
            endQuiz();
        }
    }

    //function to set up the welcome screen and reset state
    function initialize() {
        timer = 10;
        qNumber = 0
        writeWelcome();
        writeStartButtons();
    }

    //function to show the end screen
    function endQuiz() {
        writeScores();
        writeEndMessage();
    }

    //function to start the timer
    function startTimer() {
        interval = setInterval(updateTimer, 100);
    }

    //function to update the timer
    function updateTimer() {
        if (timer < 0.1) {
            clearInterval(interval)
            endQuiz();
            return
        }
        timer -= 0.1
        console.log(timer.toFixed(1))
    }

//-----------------------------------------------------------------------------------------
});

