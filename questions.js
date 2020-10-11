//Thanks to 

//HTML Questions
export var htmlQuestions = [
  {
    question: "What is the HTML element to use to insert a line break?",
    answers: ["<span>", "<br>", "<break>", "<lb>"],
    correct: 1,
  },
  {
    question:
      "Which of the following elements does NOT display inline by default?",
    answers: ["<span>", "<img>", "<div>", "<input>"],
    correct: 2,
  },
  {
    question: 'Which of these is correct way to insert an image?',
    answers: [
      '<img src="image.jpg" alt="MyImage">',
      '<image src="image.jpg" alt="MyImage">',
      '<img alt="MyImage">',
      '<img alt="MyImage">src=image.jpg</img>',
    ],
    correct: 0,
  },
  {
    question: 'In HTML, onclick and onchange are...',
    answers: [
      'Style attributes', 
      'Callback functions', 
      'HTML elements', 
      'Event attributes'],
    correct: 3,
  },
  {
    question: 'Which element is used to specify a header for a document or section?',
    answers: [
      '<lead>', 
      '<head>', 
      '<header>', 
      '<title>'],
    correct: 2,
  },
];

export var cssQuestions = [
  {
    question: 'Which is the correct CSS syntax?',
    answers: [
      'body {color=black}',
      '{body:color black}',
      'body {color: black}',
      'body:color=black',
    ],
    correct: 2,
  },
  {
    question: 'What is correct way to add a background color to all \&lt;h1\&gt; elements?',
    answers: [
      'all.h1 {background-color:#FFFFFF}',
      'h1 {background-color:#FFFFFF}',
      'h1.all {background-color:#FFFFFF}',
      '* {background-color: #FFFFFFF}',
    ],
    correct: 1,
  },
  {
    question: 'Which CSS property controls text size?',
    answers: ['text-height', 'text-size', 'font-style', 'font-size'],
    correct: 3,
  },
  {
    question: 'How do you select all p elements inside a div?',
    answers: [
      'div + p', 
      'div p', 
      'div.p', 
      'p div'],
    correct: 1,
  },
  {
    question:
      'How do you display a border like this:<h3>Top: 10px</h3><h3>Bottom: 5px</h3><h3>Left: 20px</h3><h3>Right: 1px</h3>',
    answers: [
      'border-width: 10px 1px 5px 20px',
      'border-width: 1px 20px 5px 10px',
      'border-width: 10px 5px 20px 1px',
      'border-width: 20px 5px 10px 1px',
    ],
    correct: 0,
  },
];

export var jsQuestions = [
  {
    question:
      'What is the correct JavaScript syntax to change the content of this HTML element?<h2>&lt;p id="par"&gt;This is a paragraph&lt/p&gt',
    answers: [
      'document.getElement("p").innerHTML = "Hello World!"',
      '#par.innerHTML = "Hello World!"',
      'document.getElementById("par").innerHTML = "Hello World!"',
      '$("par").text("Hello World!")',
    ],
    correct: 2,
  },
  {
    question: 'What is the correct way to write an IF statement in JavaScript?',
    answers: [
      'if i == 5', 
      'if i = 5 then', 
      'if (i == 5)', 
      'if {i == 5}'],
    correct: 2,
  },
  {
    question: 'How do you round the number 7.25, to the nearest integer?',
    answers: [
      'Math.round(7.25)',
      'round(7.25)',
      'Math.ceil(7.25)',
      '{7.25}.rnd',
    ],
    correct: 0,
  },
  {
    question: 'How do you declare a function in JavaScript?',
    answers: [
      'var function = myFunction()',
      'function myFunction()',
      'function: myFunction',
      'myFunction()',
    ],
    correct: 1,
  },
  {
    question: 'Which of these data types is inherently iterable?',
    answers: [
      'object', 
      'number', 
      'string', 
      'boolean'],
    correct: 2,
  },
];

export var jqQuestions = [
  {
    question:
      "What is the correct jQuery code to set the background color of all p elements to blue?",
    answers: [
      '$("p").style("background-color","blue");',
      '$("p").css("background-color","blue");',
      '$("p").background("blue")',
      '$("#p").css("background-color","blue");',
    ],
    correct: 1,
  },
  {
    question: 'What does the jQuery code $("div.summary") select?',
    answers: [
      'All div elements with class="summary"',
      "All div elements",
      'The first div element with class="summary"',
      'The first element with class="summary"',
    ],
    correct: 0,
  },
  {
    question:
      'Which jQuery method is used to set the display property of a selected element to "none"?',
    answers: [".hidden()", ".display(false)", ".show(false)", ".hide()"],
    correct: 3,
  },
  {
    question: "To add jQuery to your project, you must...",
    answers: [
      "Purchase a license at jQuery.com",
      "Refer to a hosted jQuery library",
      "Do nothing, jQuery is a built in part of most browsers",
      "Link https://jquery.com/download/ in the head of index.html",
    ],
    correct: 1,
  },
  {
    question:
      "Which jQuery method returns the direct parent element of the selected element?",
    answers: [".ancestor()", ".previous()", ".parent()", ".father()"],
    correct: 2,
  },
  {
    question:
      "Which jQuery method is used to perform an asynchronous HTTP request?",
    answers: [".http()", ".request()", ".show()", ".ajax()"],
    correct: 3,
  },
];


