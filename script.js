// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Quiz Data
const quizzes = {
    gk: [
        { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
        { question: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Hemingway", "Tolstoy", "Dickens"], answer: "Shakespeare" }
    ],
    programming: [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tabular Markup Language", "None of these"], answer: "Hyper Text Markup Language" },
        { question: "Which language is used for styling web pages?", options: ["HTML", "CSS", "JavaScript", "PHP"], answer: "CSS" }
    ],
    science: [
        { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "NaCl", "O2"], answer: "H2O" },
        { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" }
    ]
};

let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

// Start Quiz
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        currentQuiz = quizzes[category];
        currentQuestionIndex = 0;
        score = 0;
        timeLeft = 10;
        document.getElementById('quiz-title').textContent = card.querySelector('h3').textContent;
        document.getElementById('quizzes').classList.add('hidden');
        document.getElementById('quiz-questions').classList.remove('hidden');
        startTimer();
        showQuestion();
    });
});

// Show Question
function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const question = currentQuiz[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h3>${question.question}</h3>
        ${question.options.map(option => `
            <button class="option-btn">${option}</button>
        `).join('')}
    `;
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => checkAnswer(btn.textContent));
    });
}

// Check Answer
function checkAnswer(selectedAnswer) {
    const correctAnswer = currentQuiz[currentQuestionIndex].answer;
    if (selectedAnswer === correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuiz.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

// End Quiz
function endQuiz() {
    clearInterval(timer);
    alert(`Quiz Over! Your score is ${score}/${currentQuiz.length}`);
    document.getElementById('quiz-questions').classList.add('hidden');
    document.getElementById('quizzes').classList.remove('hidden');
    updateLeaderboard("User", score);
}

// Timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

// Leaderboard
function updateLeaderboard(name, score) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${leaderboardBody.children.length + 1}</td>
        <td>${name}</td>
        <td>${score}</td>
    `;
    leaderboardBody.appendChild(row);
}

// Section Animation on Scroll
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});