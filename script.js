const answers = {
    q1: 'specific',
    q2: 'Random-Access Memory',
    q3: 'tangible',
    q4: 'Mouse',
    q5: 'house',
    q6: 'motherboard',
    q7: 'instructions',
    q8: 'Motherboard',
    q9: 'Video Card',
    q10: 'human',
    q11: 'Read-Only-Memory',
    q12: 'case',
    q13: 'voltage',
    q14: 'antifreeze',
    q15: 'central'
};

let startTime;

window.onload = function() {
    startTime = Date.now(); 
    let timeLeft = 600; 
    const timerDisplay = document.getElementById('timer');

    if (!timerDisplay) {
        console.error('Timer element with id "timer" not found.');
        return;
    }

    const timerInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Time is up! Submitting the quiz.');
            document.querySelector('form').submit();
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `Time left: ${formatTime(minutes)}:${formatTime(seconds)}`;
        }
    }, 1000);

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    document.getElementById('quiz-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const endTime = Date.now();
        const timeTaken = Math.floor((endTime - startTime) / 1000); 
        checkAnswers(timeTaken);
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
    resultContainer.innerHTML = `<h2>Your score is ${score} out of 15 = ${(score*100/15).toFixed(2)}%</h2>`;

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

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}