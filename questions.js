//HTML Questions
export var htmlQuestions = [
  {
    question: "Which of these elements displays inline by default?",
    answers: ["p", "div", "span", "h1"],
    correct: 2,
  },
  {
    question:
      "What is the correct way to add a 2px margin to a div using inline styling?",
    answers: [
      "<div style='margin: 2px'</div>",
      "<div>style=margin: 2px</div",
      "<div margin='2px'</div>",
      "<div style='2px'></div>",
    ],
    correct: 0,
  },
  {
    question: "Which of these is a tag that will make text appear bold?",
    answers: ["<bold>", "<em>", "<div class='bold'>", "<strong>"],
    correct: 3,
  },
];

export var cssQuestions = [
  {
    question: "Which of the following is NOT a valid css selector?",
    answers: ["element", "color", "id", "attribute"],
    correct: 1,
  },
  {
    question:
      "the ::before pseudo-element...",
    answers: [
      "Inserts content at the top of the document",
      "Targets all elements before a target element",
      "Sets all properties of an element to those of the parent element",
      "Inserts content before the content of an element",
    ],
    correct: 3,
  },
  {
    question: "Which property can be used to rotate an element?",
    answers: ["transform", "tilt", "width", "border-radius"],
    correct: 0,
  },
];

export var jsQuestions = [
  {
    question: "The expression 1 == '1' will evaluate to...",
    answers: ["false", "1", "'1'", "true"],
    correct: 3,
  },
  {
    question: "How many times will 'Yes' be logged to the console when this code is executed? var count = 1; while (count < 10) { console.log(count) }; ",
    answers: ["10", "Nothing will log", "Infinity", "1",
    ],
    correct: 2,
  },
  {
    question: "Which of these data types is not always iterable?",
    answers: ["arrays", "strings", "objects", "all are iterable"],
    correct: 2,
  },
];


