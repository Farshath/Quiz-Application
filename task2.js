// Quiz Questions
const quizData = {
    general: [
        { question: "What is the capital of France?", answers: ["Paris", "London", "Berlin", "Madrid"], correct: "Paris" },
        { question: "How many continents are there?", answers: ["5", "6", "7", "8"], correct: "7" }
    ],
    science: [
        { question: "What is H2O commonly known as?", answers: ["Water", "Oxygen", "Hydrogen", "Carbon"], correct: "Water" },
        { question: "Which planet is known as the Red Planet?", answers: ["Venus", "Mars", "Jupiter", "Saturn"], correct: "Mars" }
    ]
};

let currentCategory = "";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

// Ensure DOM loads first
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("next-btn").addEventListener("click", nextQuestion);
});

// Start Quiz
function startQuiz(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("score-value").textContent = score;
    document.getElementById("category-section").classList.add("hidden");
    document.getElementById("quiz-section").classList.remove("hidden");
    showQuestion();
}

// Show Question
function showQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById("timer").textContent = timeLeft;

    const questionData = quizData[currentCategory][currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;
    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = "";

    questionData.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer);
        answersContainer.appendChild(button);
    });

    timer = setInterval(updateTimer, 1000);
}

// Update Timer
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;
    } else {
        clearInterval(timer);
        document.getElementById("feedback").textContent = "Time's up!";
        document.getElementById("next-btn").classList.remove("hidden");
    }
}

// Check Answer
function checkAnswer(selectedAnswer) {
    clearInterval(timer);
    const correctAnswer = quizData[currentCategory][currentQuestionIndex].correct;

    if (selectedAnswer === correctAnswer) {
        score++;
        document.getElementById("feedback").textContent = "Correct!";
    } else {
        document.getElementById("feedback").textContent = "Wrong!";
    }

    document.getElementById("score-value").textContent = score;
    document.getElementById("next-btn").classList.remove("hidden");
}

// Next Question
function nextQuestion() {
    document.getElementById("feedback").textContent = "";
    document.getElementById("next-btn").classList.add("hidden");

    if (currentQuestionIndex < quizData[currentCategory].length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        endQuiz();
    }
}

// End Quiz
function endQuiz() {
    alert(`Quiz Over! Your final score is ${score}`);
    document.getElementById("quiz-section").classList.add("hidden");
    document.getElementById("category-section").classList.remove("hidden");
}
