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
  var $progressBar = $('#progressBar')

  //START QUIZ-----------------------------------------------------------------
  //start the app
  initialize();
  // localStorage.clear()

  //function to set up the welcome screen and reset state
  function initialize() {
    timer = 60;
    qNumber = 0;
    $timer.text("Timer");
    setStartDOM()
  }

  //function to set the DOM to the startQuiz state
  function setStartDOM() {
      $progressBar.empty();
      $questionBox
        .empty()
        .show()
        .append('<h1>Welcome to Code Quiz!</h1>')
        .append('<p>Answer every question before time runs out. The faster you answer, the higher your score!</p>')
      $buttonBox
        .empty()
        .show()
        .append('<h2>Pick Your Topic</h2>');
      $scoresBox
        .hide();
      writeStartButtons()
  }


  //function to write the start buttons row
  function writeStartButtons() {
    for (var button of startButtons) {
      let newStartButton = $("<button>")
        .attr("id", button.id)
        .attr("class", "btn btn-primary btn-lg mx-1")
        .text(button.text)
        .on("click", loadQuiz);
      $buttonBox.append(newStartButton);
    }
  }
  //----------------------------------------------------------------------------

  //RUN QUIZ-------------------------------------------------------------------
  //function to load the appropriate quiz
  function loadQuiz(e) {
    //get the quiz type from the button that was clicked
    var quizType = e.target.id;
    //use switchboard to load the appropriate questions and highscore list
    switch (quizType) {
      case "htmlStart":
        selectQuizType("HTML", htmlQuestions, "htmlScores");
        break;
      case "cssStart":
        selectQuizType('CSS', cssQuestions, 'cssScores')
        break;
      case "jsStart":
        selectQuizType("JavaScript", jsQuestions, "jsScores");
        break;
      case "jqStart":
        selectQuizType("jQuery", jqQuestions, "jqScores");
        break;
    }

    //select quiz type
    function selectQuizType(typeString, questionsArray, scores) {
      questions = questionsArray;
      highScores = JSON.parse(localStorage.getItem(scores))
      if (!highScores) highScores = [];
    }

    //load the first question and start timer
    loadQuestion(questions, qNumber);
    startTimer();
  }

  //function to update the current question
  function loadQuestion(questions, qNumber) {
    //identify the current question
    var currentQuestion = questions[qNumber];
    //hide the buttons, show the answers, and empty them out
    $buttonBox.hide();
    $answersBox.show().empty();
    //write the question
    $questionBox.html(`<h1>${currentQuestion.question}</h1>`);
    //write the answers
    for (var i = 0; i < currentQuestion.answers.length; i++) {
      //write a new answers card
      var newAnswerCard = $('<div class="card text-center my-2 answer">');
      $answersBox.append(newAnswerCard);
      //write a new card body with an event listener
      var newAnswerCardBody = $(`<div class="card-body bg-primary"></div>`);
      newAnswerCardBody.on("click", nextQuestion);
      //if the answer at this index is the correct answer, give the card a data attribute
      if (i === currentQuestion.correct) newAnswerCardBody.attr("data-correct", true);
      newAnswerCardBody.text(currentQuestion.answers[i]);
      newAnswerCard.append(newAnswerCardBody);
    }
  }

  //function to load the next question
  function nextQuestion(e) {
    var isCorrect = e.target.getAttribute("data-correct");
    //take away time if they choose the wrong answer
    if (!isCorrect) timer -= 10;
    updateProgress(isCorrect)
    //move to the next question
    qNumber++;
    //if you have reached the end of the questions, end the quiz
    (qNumber < questions.length) ? loadQuestion(questions, qNumber) : endQuiz()
  }

  //END QUiZ--------------------------------------------------------------------
  //function to show the end screen
  function endQuiz() {
    //calculate final score
    score = Math.max((timer * 10).toFixed(), 0);
    timer = 0;
    $timer.text("Timer: " + timer.toFixed(1));
    //stop the timer
    clearInterval(interval);
    //write the end message, buttons, and scores
    setEndDOM();
  }

  //function set the DOM to the end quiz state
  function setEndDOM() {
      //new buttons
      var homeButton = $("<button>")
        .attr("class", "btn btn-primary btn-lg mx-1")
        .text("Home")
        .on("click", initialize);
      //set DOM elements
      $questionBox
        .empty()
        .append(`<h1>Final Score: ${score}</h1>`)
        .append('<p>Enter Your Name</p>')
        .append($('<input type="text" id="nameInput">'))
        .append($('<input type="submit" id="nameSubmit">').on("click", saveNewName))
      $buttonBox
        .empty()
        .show()
        .append(homeButton);
      $answersBox.hide();
      $scoresBox.show();
      $scoresList.empty();
      writeScores();
  }

  //function to write the scores list
  function writeScores() {
    //reset the scores list
    $scoresList.empty();
    //sort the current scores
    highScores = sortScores(highScores);
    //loop through the sorted array and add them to scores list
    for (var i = 0; i <highScores.length; i++) {
        var newScore = $('<li>');
        newScore.append(`<span class="left">${highScores[i].name}</span>`);
        newScore.append(`<span>${highScores[i].score}</span>`);
        if (i === 0) newScore.append('<span class="right">🥇</span>');
        if (i === 1) newScore.append('<span class="right">🥈</span>');
        if (i === 2) newScore.append('<span class="right">🥉</span>');
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
    //if the timer reaches 0, end the quiz and stop the timer
    if (timer < 0.1) {
      clearInterval(interval);
      endQuiz();
      return;
    }
    //otherwise increment time and change DOM
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
    //check if there is anything in the input field
    if (currentNameInput) {
        //if there is, push a new score to the array
        highScores.push({ name: currentNameInput, score: score})
        //re-write the scores list
        writeScores()
        //hide the inputs fields
        $questionBox.slideUp()
        //use switchboard to save new scores to the appropriate variable
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

  }
  //--------------------------------------------------------------------------------

  //PROGRESS BAR-------------------------------------------------------------------
  //function to update progress bar
    function updateProgress(correct) {
        if (correct) {
            var newProgress = $('<div class="progress-bar bg-success" role="progressbar" style="width: 0%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>')
              .animate({width: `${100/questions.length}%`}, 100);
            $progressBar.append(newProgress);
        } else {
            var newProgress = $('<div class="progress-bar bg-danger" role="progressbar" style="width: 0%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>')
              .animate({width: `${100/questions.length}%`}, 100);
            $progressBar.append(newProgress);
        }
    }
  //-----------------------------------------------------------------------------

  //--------------------------------------------------------------------------------
});

