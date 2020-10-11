//import the questions list
import { htmlQuestions, cssQuestions, jsQuestions, jqQuestions, allQuestions } from './questions.js';

$(document).ready(function () {
  //-------------------------------------------------------------------------

  //INITIAL STATE-----------------------------------------------------------
  //global variables
  var questions = null;
  var qNumber = 0;
  var timer;
  var score = 0;
  var highScores = [];
  var startButtons = [
    { id: "htmlStart", text: "HTML" },
    { id: "cssStart", text: "CSS" },
    { id: "jsStart", text: "JavaScript" },
    { id: "jqStart", text: "jQuery" },
    { id: "allStart", text: "Everything" }
  ];
  var interval;

  //Base DOM elements
  var $questionBox = $("#questionBox");
  var $answersBox = $("#answersBox");
  var $buttonBox = $("#buttonBox");
  var $scoresBox = $("#scoresBox");
  var $scoresList = $("#scoresList");
  var $timer = $("#timer");
  var $progressBar = $("#progressBar");

  //START QUIZ-----------------------------------------------------------------
  //start the app
  initialize();
  // localStorage.clear()

  //function to set up the welcome screen and reset state
  function initialize() {
    qNumber = 0;
    setStartDOM();
  }

  //function to set the DOM to the startQuiz state
  function setStartDOM() {
    $timer.hide();
    $progressBar.empty();
    $questionBox
      .empty()
      .show()
      .append("<h1>Welcome to Code Quiz!</h1>")
      .append(
        "<p>Answer every question before time runs out. The faster you answer, the higher your score!</p>"
      );
    $scoresBox.hide();
    writeStartButtons();
  }

  //function to write the start buttons row
  function writeStartButtons() {
    $buttonBox.empty().show().append("<h2>Pick Your Topic</h2>");
    for (var button of startButtons) {
      let newStartButton = $("<button>")
        .attr("id", button.id)
        .attr("class", "mx-2 rounded p-2")
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
        selectQuizType(htmlQuestions, "htmlScores");
        break;
      case "cssStart":
        selectQuizType(cssQuestions, "cssScores");
        break;
      case "jsStart":
        selectQuizType(jsQuestions, "jsScores");
        break;
      case "jqStart":
        selectQuizType(jqQuestions, "jqScores");
        break;
      case "allStart":
        selectQuizType(allQuestions, "allScores");
        break;
    }

    //load the first question and start timer
    loadQuestion(questions, qNumber);
    startTimer();
  }

  //select quiz type
  function selectQuizType(questionsArray, scores) {
    questions = scramble(questionsArray);
    highScores = JSON.parse(localStorage.getItem(scores));
    //set timer based on how many questions are in the quiz
    timer = questions.length * 12;
    if (!highScores) highScores = [];
  }

  //function to update the current question
  function loadQuestion(questions, qNumber) {
    //identify the current question and answers
    var currentQuestion = questions[qNumber].question;
    var currentAnswers = questions[qNumber].answers;
    var currentCorrect = questions[qNumber].correct;
    //hide the buttons, show the answers, and empty them out
    $buttonBox.hide();
    $answersBox.show().empty();
    //write the question
    $questionBox.html(`<h2>${currentQuestion}</h2>`);
    //write the answers
    for (var i = 0; i < currentAnswers.length; i++) {
      var newAnswerCard = $('<div class="card text-center my-2 answer">');
      $answersBox.append(newAnswerCard);
      var newAnswerCardBody = $(`<div class="card-body"></div>`).on(
        "click",
        nextQuestion
      );
      //if the answer at this index is the correct answer, give the card a data attribute
      if (i === currentCorrect) newAnswerCardBody.attr("data-correct", true);
      //update the text of the new answer and append it
      newAnswerCardBody.text(currentAnswers[i]);
      newAnswerCard.append(newAnswerCardBody);
    }
  }

  //function to load the next question
  function nextQuestion(e) {
    var isCorrect = e.target.getAttribute("data-correct");
    //take away time if they choose the wrong answer
    if (!isCorrect) timer -= 12;
    updateProgress(isCorrect);
    qNumber++;
    //if you have reached the end of the questions, end the quiz
    qNumber < questions.length ? loadQuestion(questions, qNumber) : endQuiz();
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
      .attr("class", "mx-1 rounded p-2")
      .text("Go Home")
      .on("click", initialize);
    var clearButton = $("<button>")
      .attr("class", "mx-1 rounded p-2")
      .text("Clear High Scores")
      .on("click", clearHighScores);
    //set DOM elements
    $questionBox
      .empty()
      .append(`<h1>Final Score: ${score}</h1>`)
      .append("<p>Enter Your Name</p>")
      .append($('<input type="text" id="nameInput" maxlength="20">'))
      .append(
        $('<input type="submit" id="nameSubmit">').on("click", saveNewName)
      );
    $buttonBox.empty().show().append(homeButton, clearButton);
    $answersBox.hide();
    $scoresBox.show();
    writeScores();
  }

  //function to write the scores list
  function writeScores() {
    //reset the scores list
    $scoresList.empty();
    //sort the current scores
    highScores = sortScores(highScores);
    //loop through the sorted array and add them to scores list
    for (var i = 0; i < highScores.length; i++) {
      var newScore = $("<li>");
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
    $timer.show().text("Timer: " + timer.toFixed(1));
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

  //function to set scores
  function setScores(questions) {
    switch (questions) {
      case htmlQuestions:
        localStorage.setItem("htmlScores", JSON.stringify(highScores));
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
      case allQuestions:
        localStorage.setItem("allScores", JSON.stringify(highScores));
    }
  }

  //function to save scores
  function saveNewName(e) {
    e.preventDefault();
    let currentNameInput = $("#nameInput").val();
    //check if there is anything in the input field
    if (currentNameInput) {
      //if there is, push a new score to the array
      highScores.push({ name: currentNameInput, score: score });
      //if high scores is longer than 10, remove the last score
      if (highScores.length > 10) highScores.pop();
      //re-write the scores list
      writeScores();
      //hide the inputs fields
      $questionBox.slideUp();
      //use switchboard to save new scores to the appropriate variable
      setScores(questions);
    }
  }

  //function to clear high scores
  function clearHighScores() {
    highScores = [];
    setScores(questions);
    writeScores();
  }
  //--------------------------------------------------------------------------------

  //PROGRESS BAR-------------------------------------------------------------------
  //function to update progress bar
  function updateProgress(correct) {
    if (correct) {
      var newProgress = $(
        `<div class="progress-bar bg-success" role="progressbar" style="width: 0%" aria-valuenow="${
          100 / questions.length
        }" aria-valuemin="0" aria-valuemax="100"></div>`
      ).animate({ width: `${100 / questions.length}%` }, 100);
      $progressBar.append(newProgress);
    } else {
      var newProgress = $(
        `<div class="progress-bar bg-danger" role="progressbar" style="width: 0%" aria-valuenow="${
          100 / questions.length
        }" aria-valuemin="0" aria-valuemax="100"></div>`
      ).animate({ width: `${100 / questions.length}%` }, 100);
      $progressBar.append(newProgress);
    }
  }
  //---------------------------------------------------------------------------------

  //SCRAMBLE FUNCTION
  function scramble(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  //--------------------------------------------------------------------------------
});

