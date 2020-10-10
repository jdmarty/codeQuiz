import { htmlQuestions, cssQuestions, jsQuestions, jqQuestions } from './questions.js';

$(document).ready(function () {
  //-------------------------------------------------------------------------

  //INITIAL STATE-----------------------------------------------------------
  //global variables
  var questions = null;
  var qNumber = 0;
  var timer = 60;
  var score = 0;
  var highScores = [];
  var startButtons = [
    { id: "htmlStart", text: "HTML" },
    { id: "cssStart", text: "CSS" },
    { id: "jsStart", text: "JavaScript" },
    { id: "jqStart", text: "jQuery" },
  ];
  var interval;

  //Base DOM elements
  var $questionBox = $("#questionBox");
  var $answersBox = $("#answersBox");
  var $buttonBox = $("#buttonBox");
  var $scoresBox = $("#scoresBox");
  var $scoresList = $("#scoresList");
  var $timer = $("#timer");

  //START QUIZ-----------------------------------------------------------------
  //start the app
  initialize();

  //function to set up the welcome screen and reset state
  function initialize() {
    timer = 60;
    qNumber = 0;
    $timer.text("Timer");
    writeWelcome();
    writeStartButtons();
  }

  //function to write the welcome message
  function writeWelcome() {
    $questionBox.empty();
    $questionBox.append('<h1 class="display-4">Welcome to Code Quiz!</h1>');
    $questionBox.append(
      '<p class="lead">Answer every question before time runs out. The faster you answer, the higher your score!</p>'
    );
  }

  //function to write the start buttons row
  function writeStartButtons() {
    $buttonBox.empty().show();
    $scoresBox.hide();
    $buttonBox.append("<h2>Pick Your Topic</h2>");
    for (var button of startButtons) {
      let newStartButton = $("<button>");
      newStartButton.attr("id", button.id);
      newStartButton.attr("class", "btn btn-primary btn-lg mx-1");
      newStartButton.attr("type", "button");
      newStartButton.text(button.text);
      newStartButton.on("click", loadQuiz);
      $buttonBox.append(newStartButton);
    }
  }
  //----------------------------------------------------------------------------

  //RUN QUIZ-------------------------------------------------------------------
  //function to load the appropriate quiz
  function loadQuiz(e) {
    var quizType = e.target.id;
    switch (quizType) {
      case "htmlStart":
        questions = htmlQuestions;
        highScores = JSON.parse(localStorage.getItem(htmlScores));
        if (!highScores) highScores = [];
        break;
      case "cssStart":
        questions = cssQuestions;
        highScores = JSON.parse(localStorage.getItem(cssScores));
        if (!highScores) highScores = [];
        break;
      case "jsStart":
        questions = jsQuestions;
        highScores = JSON.parse(localStorage.getItem(jsScores));
        if (!highScores) highScores = [];
        break;
      case "jqStart":
        questions = jqQuestions;
        highScores = JSON.parse(localStorage.getItem(jqScores));
        if (!highScores) highScores = [];
        break;
    }
    loadQuestion(questions, qNumber);
    startTimer();
  }

  //function to update the current question
  function loadQuestion(questions, qNumber) {
    var currentQuestion = questions[qNumber];
    $buttonBox.hide();
    $scoresBox.hide();
    $answersBox.show();
    $questionBox.html(`<h1 class="display-4">${currentQuestion.question}</h1>`);
    $answersBox.empty();
    for (var i = 0; i < currentQuestion.answers.length; i++) {
      var newAnswerCard = $('<div class="card text-center my-2 answer">');
      $answersBox.append(newAnswerCard);
      var newAnswerCardBody = $(`<div class="card-body"></div>`);
      newAnswerCardBody.on("click", nextQuestion);
      if (i === currentQuestion.correct) newAnswerCardBody.attr("data-correct", true);
      newAnswerCardBody.text(currentQuestion.answers[i]);
      newAnswerCard.append(newAnswerCardBody);
    }
  }

  //function to load the next question
  function nextQuestion(e) {
    var isCorrect = e.target.getAttribute("data-correct");
    if (!isCorrect) timer -= 5;
    qNumber++;
    (qNumber < questions.length) ? loadQuestion(questions, qNumber) : endQuiz()
  }

  //END QUiZ--------------------------------------------------------------------
  //function to show the end screen
  function endQuiz() {
    score = Math.max((timer * 10).toFixed(), 0);
    clearInterval(interval);
    writeEndMessage();
    writeEndButtons();
    writeScores();
  }

  //function to write end of quiz message
  function writeEndMessage() {
    $questionBox.empty();
    $questionBox.append(`<h1 class="display-4">Final Score: ${score}</h1>`);
    $questionBox.append('<p class="lead">Enter Your Name</p>');
    var newNameInput = $('<input type="text" id="nameInput">');
    $questionBox.append(newNameInput);
    var newSubmit = $('<input type="submit" id="nameSubmit">');
    newSubmit.on("click", saveNewName)
    $questionBox.append(newSubmit);
  }

  //function to write the end buttons
  function writeEndButtons() {
    $buttonBox.empty().show();
    var replayButton = $("<button>");
    replayButton.attr("class", "btn btn-primary btn-lg mx-1");
    replayButton.attr("type", "button");
    replayButton.text("Play Again?");
    replayButton.on("click", initialize);
    $buttonBox.append(replayButton);
  }

  //function to write the scores list
  function writeScores() {
    $answersBox.hide();
    $scoresList.empty();
    $scoresBox.show();
    highScores = sortScores(highScores);
    for (var i=0; i<highScores.length; i++) {
        var newScore = $('<li>')
        newScore.text(`${highScores[i].name}: ${highScores[i].score}`);
        $scoresList.append(newScore);
      }
    }
  //----------------------------------------------------------------------------

  //TIMER FUNCTIONS--------------------------------------------------------------
  //function to start the timer
  function startTimer() {
    interval = setInterval(updateTimer, 100);
  }

  //function to update the timer
  function updateTimer() {
    if (timer < 0.1) {
      clearInterval(interval);
      endQuiz();
      return;
    }
    timer -= 0.1;
    $timer.text("Timer: " + timer.toFixed(1));
  }
  //--------------------------------------------------------------------------------

  //SCORE FUNCTIONS----------------------------------------------------------------
  //function to sort scores array
  function sortScores() {
    let sortedArray = Object.entries(highScores)
      .sort((a, b) => {
        if (b[1].score > a[1].score) return 1;
        return -1;
      })
      .map((el) => el[1]);
    return sortedArray;
  }

  //function to save scores
  function saveNewName(e) {
    e.preventDefault()
    let currentNameInput = $('#nameInput').val()
    if (currentNameInput) highScores.push({ name: currentNameInput, score: score})
    writeScores()
    $('#nameInput').hide();
    $('#nameSubmit').hide();
    switch (questions) {
      case htmlQuestions:
        localStorage.setItem('htmlScores', JSON.stringify(highScores))
        break;
      case cssQuestions:
        localStorage.setItem("cssScores", JSON.stringify(highScores));
        break;
      case jsQuestions:
        localStorage.setItem("jsScores", JSON.stringify(highScores));
        break;
      case jqQuestions:
        localStorage.setItem("jqScores", JSON.stringify(highScores));
        break;
    }
  }

  //--------------------------------------------------------------------------------
});

