# Code Quiz

## Links
 - Deployed [https://jdmarty.github.io/codeQuiz/](https://jdmarty.github.io/codeQuiz/)
 - Repository [https://github.com/jdmarty/codeQuiz](https://github.com/jdmarty/codeQuiz)



 ## How to use
 1. Select the type of quiz you want to take from the buttons on the home screen. High score boards
 are specific to each quiz type. A timer (12 seconds per question) will start as soon as you click the start button
 2. Select the correct answer from the options presented below.
 3. Check the progress bar at the top of the screen to validate your answers. Wrong answers will deduct time from the clock.
 4. Once you have completed the quiz, your score will be calculated from the time remaining and you will be asked to add your name to the high scores board.
 5. Enter your name in the presented input field and click submit to add your name to the board.
 6. Click the Clear High Scores button to reset the high scores board for the current quiz
 7. Click the Go Home button to reset to the home page

 ## How to update/add questions
 Questions for each quiz are stored in their own array in the questions.js file. Add questions to a quiz by creating an object with the following format and adding it to the appropriate array:
    - question: String containing a the question prompt
    - answers: An array of strings containing possible answers to the question
    - correct: The index of the correct answer 

## How to add quizzes
1. Create and export a new variable bound to an array.
2. Fill that array with questions using the format described above.
3. Add your named variable to the import statement at the top of script.js
4. Add a new start button by adding an object to the startButtons array in script.js using the following format:
    - id: String containing the name to be used when identifying the quiz later
    - text: String containing text to display on the button
5. Add your quiz to the loadQuiz switchboard using the following format:
    - case: string matching id value of the button created in the previous step
    - selectQuizType first argument: variable containing appropriate questions array imported from questions.js
    - selectQuizType second argument: string defining the name that you want to use to call the high scores board for this quiz.
6. Add your scoreboard to the setScores switchboard using the following format:
    - case: variable containing appropriate questions array imported from questions.js
    - localStorage.setItem first argument: string matching the name set in the previous step to define the scoreboard for this quiz
    - localStorage.setItem second argument: JSON.stringify(highScores)
--------------------------------

# 04 Web APIs: Code Quiz

## Your Task

As you proceed in your journey to becoming a full-stack web developer, it’s likely that you’ll be asked to complete a coding assessment, perhaps as part of an interview process. A typical coding assessment is a combination of multiple-choice questions and interactive coding challenges. 

To help you become familiar with these tests and give you a chance to apply the skills from this module, this week’s homework invites you to build a timed coding quiz with multiple-choice questions. This app will run in the browser, and will feature dynamically updated HTML and CSS powered by JavaScript code that you write. It will have a clean, polished, and responsive user interface. This week’s coursework will teach you all the skills you need to succeed in this assignment.


## User Story

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```


## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
```


## Mock-Up

The following animation demonstrates the application functionality:

![code quiz](./Assets/04-web-apis-homework-demo.gif)


## Grading Requirements

This homework is graded based on the following criteria: 

### Technical Acceptance Criteria: 40%

* Satisfies all of the above acceptance criteria.

### Deployment: 32%

* Application deployed at live URL.

* Application loads with no errors.

* Application GitHub URL submitted.

* GitHub repository that contains application code.

### Application Quality: 15%

* Application user experience is intuitive and easy to navigate.

* Application user interface style is clean and polished.

* Application resembles the mock-up functionality provided in the homework instructions.

### Repository Quality: 13%

* Repository has a unique name.

* Repository follows best practices for file structure and naming conventions.

* Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

* Repository contains multiple descriptive commit messages.

* Repository contains quality README file with description, screenshot, and link to deployed application.


## Review

You are required to submit BOTH of the following for review:

* The URL of the functional, deployed application.

* The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.

- - -
© 2020 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
