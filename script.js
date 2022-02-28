var question = [ 
    {
        q: 'What is the HTML tag under which one can write the JavaScript code?',
        answers: [
            { text: "A. <javascript>", correct: false },
            { text: "B. <scripted>", correct: false },
            { text: "C. <script>", correct: true },
            { text: "D. <js>", correct: false },
        ]
    },
    {
        q: 'How do you create a function in JavaScript?',
        answers: [
            { text: "A. function:myFunction()", correct: false },
            { text: "B. function myFunction()", correct: true },
            { text: "C. function = myFunction()", correct: false },
            { text: "D. None of the above.", correct: false },
        ]
    },
    {
        q: 'How to write an IF statement in JavaScript?',
        answers: [
            { text: "A.  if i = 5", correct: false },
            { text: "B.  if (i == 5)", correct: true },
            { text: "C.  if i == 5 then", correct: false },
            { text: "D.  if i = 5 then", correct: false },
        ]
    },
    {
        q: "Which built-in method combines the text of two strings and returns a new string?",
        answers: [
            { text: "A. append()", correct: false },
            { text: "B. concat()", correct: true },
            { text: "C. attach()", correct: false },
            { text: "D. None of the above.", correct: false },
        ]
    }
]

var start = document.getElementById("start-btn");
var nextBtn = document.getElementById("next-btn");
var questionContainer = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerBtn = document.getElementById("answer-btn");
var timer = document.getElementById('timer');
var container = document.getElementById('container');
var shuffledQuestions, currentQuestionIndex;
var time = 60;
var score = 0;
var indexArray = 0;
var restart = 0;

function startQuiz() {
    resetState();
    time = 60;
    timer.innerHTML = 'Time: ' + (time); 
        var timeId = setInterval(() => {
            if (restart) {
                clearInterval(timeId)
                restart = 0;
            }
            time --;
            timer.innerHTML = 'Time: ' + (time);
            if (time < 1) {
                clearInterval(timeId);
                endTime();
            }
        }, 1000);
    start.classList.add('hide');
    shuffledQuestions = question.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide')
    nextQuestions();
}


function endTime() {
    questionContainer.innerHTML = "YOU LOSE";
}

function nextQuestions () {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.q
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerBtn.appendChild(button)
    })
}

function resetState() {
    //clearStatusClass(document.body)
    nextBtn.classList.add('hide')
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild)
    }
}

function selectAnswer(e) {
    var selectedBtn = e.target
    var correct = selectedBtn.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerBtn.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide')
    } else {
        start.innerText = 'Restart'
        start.classList.remove('hide')
        nextBtn.classList.add('hide')
        restart = 1;
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

}

start.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    nextQuestions();
})


//Click on Start button
  // start the timer
  // display the first question with options 
    // check if index < questions.length
    //create a function with index as an argument
  //each option is a button with click event on it // may be use event.target with matches function

//Stopt the timer
  // if timer = 0;
  // if user finished the quiz

//Find out if user clicked option is correct or not
  //if correct : display message (for certain time period)
  //wrong : display msg for certain time period)
  // calculate the score (but don't display) and change the timer accordingly
// index++
//display the next question

//once user finished with last question
 // stop timer
 //ask for user initials in a form > take that info and display it with score
 //save initials and score in local storage
 // a href will refer to second html file