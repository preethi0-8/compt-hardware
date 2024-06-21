const answers = {
    q1: 'A set of instructions that enables the computer to carry out specific tasks',
    q2: 'Random-Access Memory',
    q3: 'A general term to describe the physical components that are the essential of every computer',
    q4: 'Mouse',
    q5: 'To house the CPU and other essential components',
    q6: 'The motherboard of a computer',
    q7: 'Instructions for processing instructions',
    q8: 'Motherboard',
    q9: 'Video Card',
    q10: 'Translates processed data so it is human understandable',
    q11: 'Read-Only-Memory',
    q12: 'A case that contains most of the internal hardware of a personal computer',
    q13: 'Change voltage to match another device',
    q14: 'disperse a mix of antifreeze and water',
    q15: 'Central Processing Unit'
};

let startTime;
let formSubmitted = false;

window.onload = function() {
    startTime = Date.now(); // Capture start time
    let timeLeft = 10; // 10 minutes in seconds
    const timerDisplay = document.getElementById('timer');
    const quizForm = document.getElementById('quiz-form');

    if (!timerDisplay) {
        console.error('Timer element with id "timer" not found.');
        return;
    }

    const timerInterval = setInterval(function() {
        if (timeLeft <= 0) {
            stopTimer();
            alert('Time is up! Submitting the quiz.');
            quizForm.submit(); // Auto-submit the form
            checkAnswers(timeLeft);
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `Time left: ${formatTime(minutes)}:${formatTime(seconds)}`;
        }
    }, 1000);

    function stopTimer() {
        clearInterval(timerInterval);
    }

    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (formSubmitted) return; // Prevent multiple submissions
        const endTime = Date.now();
        const timeTaken = Math.floor((endTime - startTime) / 1000); // Time taken in seconds
        stopTimer();
        checkAnswers(timeTaken);
        disableRadioInputs(); // Disable radio inputs after submission
        formSubmitted = true; // Set flag to true after submission
    });
};

function checkAnswers(timeTaken) {
    let score = 0;
    const form = document.getElementById('quiz-form');
    const formData = new FormData(form);
    const userAnswers = {};

    for (let [question, answer] of formData.entries()) {
        userAnswers[question] = answer;
        if (answers[question] === answer) {
            score++;
        }
    }

    showResults(userAnswers, score, timeTaken);
}

function showResults(userAnswers, score, timeTaken) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = `<h2>Your score is ${score} out of 15 = ${(score * 100 / 15).toFixed(2)}%</h2>`;

    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    resultContainer.innerHTML += `<p>Time taken: ${formatTime(minutes)}:${formatTime(seconds)}</p>`;
    const questions = Object.keys(answers);
    questions.forEach((question, index) => {
        const userAnswer = userAnswers[question] || 'No answer';
        const correctAnswer = answers[question];
        resultContainer.innerHTML += `
            <div class="result-question">
                <h3>Question ${index + 1}</h3>
                <p>Your answer: ${userAnswer}</p>
                <p>Correct answer: ${correctAnswer}</p>
            </div>
        `;
    });
}

function disableRadioInputs() {
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(input => {
        input.disabled = true;
    });
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
