import React, { useState } from 'react';
import './styles.css'; // Import the CSS file

function shuffleArray(array) {
  // Shuffle function remains the same
  // Implementation goes here
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
return array;
}

function QuizApp() {
  const questionsData = [
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      answer: 'Paris',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
      answer: 'Mars',
    },
    // Add more questions as needed
  ];

  const [score, setScore] = useState(0);
  const [userAnswered, setUserAnswered] = useState(false);
  const [questionsShown, setQuestionsShown] = useState([]);

  const loadRandomQuestion = () => {
    if (userAnswered) {
      setUserAnswered(false);
    }

    if (questionsShown.length === questionsData.length) {
      alert('All questions have been shown.');
      return;
    }

    const shuffledQuestions = shuffleArray(questionsData);
    let randomQuestion;

    do {
      randomQuestion = shuffledQuestions[0];
    } while (questionsShown.includes(randomQuestion));

    setQuestionsShown([...questionsShown, randomQuestion]);
    questionsShown.push(randomQuestion);

            var questionElement = document.getElementById('question');
            var optionsElement = document.getElementById('options');
            var resultMessageElement = document.getElementById('result-message');

            if (questionElement && optionsElement && resultMessageElement) {
                questionElement.innerText = randomQuestion.question;

                // Clear existing options and result message
                optionsElement.innerHTML = "";
                resultMessageElement.innerText = "";

                // Add options dynamically
                randomQuestion.options.forEach(function (option) {
                    var li = document.createElement('li');
                    li.innerText = option;
                    li.onclick = function (event) {
                        checkAnswer(event, randomQuestion.answer);
                    };
                    optionsElement.appendChild(li);
                });
            }

    // Load question logic here
  };

  const checkAnswer = (event, correctAnswer) => {
    // Check answer logic here
    if (userAnswered) {
        return;
    }

    var selectedOption = event.target.innerText;

    if (selectedOption === correctAnswer) {
        score += 5;
        updateScore();
        document.getElementById('result-message').innerText = "Correct!";
    } else {
        document.getElementById('result-message').innerText = "Wrong!";
    }

    // Disable further selections
    userAnswered = true;

    // Disable options
    var options = document.getElementById('options').getElementsByTagName('li');
    for (var i = 0; i < options.length; i++) {
        options[i].style.pointerEvents = 'none';
    }

    // Enable the next button
    document.getElementById('next-button').disabled = false;
  };

  const updateScore = () => {
    // Update score logic here
    var scoreElement = document.getElementById('current-score');
    if (scoreElement) {
        scoreElement.innerText = score;
    }
  };

  return (
    <div>
      <h1>Random Quiz Questions</h1>
      <div id="score">Score: <span>{score}</span></div>
      <div id="question-container">
        {/* Content goes here */}
      </div>
      <button className="button" onClick={loadRandomQuestion} disabled>Next</button>
    </div>
  );
}

export default QuizApp;
