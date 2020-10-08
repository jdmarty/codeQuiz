$(document).ready(function () {
  //-------------------------------------------------------------------------

  //questions array
  var htmlQuestions = [
    {
      question: "Which of these elements displays inline by default?",
      answers: ["p", "div", "span", "h1"],
      correct: 2,
    },
    {
      question:
        "What is the correct way to add a 2px margin to a div using inline styling?",
      answers: [
        '<div style="margin: 2px"</div>',
        '<div>style=margin: 2px</div',
        '<div margin="2px"</div',
        '<div style="2px"></div',
      ],
      correct: 0,
    },
    {
      question: "Which of these is a tag that will make text appear bold?",
      answers: ["<bold>", "<em>", '<div class="bold">', "<strong>"],
      correct: 3,
    },
  ];

  //global variables
  var questions = null;
  var qNumber = 0;
  var score = 0;
  var $questionBox = $("#questionBox");
  var $answersBox = $("#answersBox");
  var $buttonBox = $("#buttonBox");

  //function to update the questions box
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
        //give that div an event listener
        newAnswerCard.on("click", nextQuestion);
        //append it to the answers
        $answersBox.append(newAnswerCard);
        //create a new div for the text
        var newAnswerCardBody = $(`<div class="card-body"></div>`)
        //set the text
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
  function nextQuestion() {
      qNumber++
      if (qNumber < questions.length) loadQuestion(questions, qNumber);
  }

  //-----------------------------------------------------------------------------------------
});

