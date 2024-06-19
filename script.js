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
    
    function checkAnswers() {
    let score = 0;
    const form = document.getElementById('quiz-form');
    const formData = new FormData(form);
    for (let [question, answer] of formData.entries()) {
    if (answers[question] === answer) {
    score++;
    }
    }
    document.getElementById('result').innerText = Your score is ${score} out of 15;
    }
    
    window.onload = function() {
        let timeLeft = 600 
        const timerDisplay = document.getElementById('timer');
        
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
    };