const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

// Array of quiz questions
const quiz = [
    // Existing and new questions...
    {
        question: "Q. What is the correct HTML element for inserting a line break?",
        choices: ["<br>", "<break>", "<lb>", "<newline>"],
        answer: "<br>"
    },
    {
        question: "Q. Which of the following is a JavaScript framework?",
        choices: ["React", "Laravel", "Django", "Flask"],
        answer: "React"
    },
    {
        question: "Q. Which of the following is used to style web pages?",
        choices: ["HTML", "CSS", "JavaScript", "Python"],
        answer: "CSS"
    },
    {
        question: "Q. Which HTML attribute is used to define inline styles?",
        choices: ["style", "styles", "class", "font"],
        answer: "style"
    },
    {
        question: "Q. Which JavaScript method is used to write content into a popup window?",
        choices: ["alert()", "prompt()", "write()", "document.write()"],
        answer: "document.write()"
    },
    {
        question: "Q. Which HTML element is used for the largest heading?",
        choices: ["<h1>", "<h6>", "<heading>", "<h3>"],
        answer: "<h1>"
    },
    {
        question: "Q. Which CSS property is used to change the text color of an element?",
        choices: ["font-color", "text-color", "color", "background-color"],
        answer: "color"
    },
    {
        question: "Q. Which JavaScript method is used to select an element by its ID?",
        choices: ["getElementByClassName", "getElementById", "querySelector", "getElementByName"],
        answer: "getElementById"
    },
    {
        question: "Q. Which attribute is used in HTML to create a hyperlink?",
        choices: ["src", "href", "link", "url"],
        answer: "href"
    },
    {
        question: "Q. What does CSS stand for?",
        choices: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        answer: "Cascading Style Sheets"
    }
];

// Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    questionDetails.choices.forEach((choice, index) => {
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = choice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            // Ensure only one choice can be selected at a time
            const selectedChoice = document.querySelector('.choice.selected');
            if (selectedChoice && selectedChoice !== choiceDiv) {
                selectedChoice.classList.remove('selected');
            }
            choiceDiv.classList.toggle('selected');
        });
    });

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Check Answer
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice) {
        displayAlert("Please select an option before proceeding!");
        return;
    }
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        displayAlert("Correct Answer!");
        score++;
    } else {
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the correct answer.`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    } else {
        stopTimer();
        showScore();
    }
}

// Show Score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any existing timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again?");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Shuffle Questions
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Start Quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Event Listeners
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        displayAlert("Please select an answer before proceeding!");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});
