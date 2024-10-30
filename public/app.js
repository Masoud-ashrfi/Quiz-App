const question = document.querySelector(".quesetion");
const answerBtns = document.querySelectorAll(".btn");
const answerBtn1 = document.querySelector(".answerBtn-1");
const answerBtn2 = document.querySelector(".answerBtn-2");
const answerBtn3 = document.querySelector(".answerBtn-3");
const answerBtn4 = document.querySelector(".answerBtn-4");
const nextBtn = document.querySelector(".next-btn");

let score = 0;
let currentQuestionIndex = 0;

const questions = [
  {
    text: "1. Which is the largest animal in the world?",
    answers: ["Shark", "Blue whale", "Elephant", "Giraffe"],
    correctAnswer: 1, // Index for "Blue whale"
  },
  {
    text: "2. Which is the smallest country in the world?",
    answers: ["Vatican City", "Bhutan", "Nepal", "Sri Lanka"],
    correctAnswer: 0, // Index for "Vatican City"
  },
  {
    text: "3. Which is the largest desert in the world?",
    answers: ["Kalahari", "Gobi", "Sahara", "Antarctica"],
    correctAnswer: 3, // Index for "Antarctica"
  },
  {
    text: "4. Which is the smallest continent in the world?",
    answers: ["Asia", "Australia", "Arctic", "Africa"],
    correctAnswer: 1, // Index for "Australia"
  },
];

function loadQuestion(index) {
  const currentQuestion = questions[index];
  question.textContent = currentQuestion.text;
  answerBtn1.textContent = currentQuestion.answers[0];
  answerBtn2.textContent = currentQuestion.answers[1];
  answerBtn3.textContent = currentQuestion.answers[2];
  answerBtn4.textContent = currentQuestion.answers[3];

  // Reset button styles
  answerBtns.forEach((btn) => {
    btn.style.backgroundColor = "";
  });

  nextBtn.style.display = "none"; // Hide the next button initially
  checkingAnswer(currentQuestion.correctAnswer);
}

function checkingAnswer(correctAnsIndex) {
  answerBtns.forEach((btn, index) => {
    btn.onclick = () => {
      nextBtn.style.display = "block"; // Show next button

      // Apply color based on correct or incorrect answer
      if (index !== correctAnsIndex) {
        btn.style.backgroundColor = "#ff9393"; // Incorrect
        answerBtns[correctAnsIndex].style.backgroundColor = "#9aeabc"; // Show correct answer
      } else {
        answerBtns[correctAnsIndex].style.backgroundColor = "#9aeabc"; // Correct
        score++;
      }
    };
  });
}

// Initial question load
loadQuestion(currentQuestionIndex);

// Add event listener for the next button
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
  } else {
    // Show the final score
    question.textContent = `You scored ${score} out of ${questions.length}!`;
    document.querySelector(".answer-btns").style.display = "none"; // Hide answer buttons
    nextBtn.textContent = "Play again!"; // Change button text to "Play again"
    nextBtn.style.display = "block"; // Show the Play again button

    // Clear previous state
    nextBtn.onclick = restartQuiz; // Assign restart function
  }
});

// Restart functionality
function restartQuiz() {
  // Reset score and index
  score = 0;
  currentQuestionIndex = 0;

  // Show answer buttons again
  document.querySelector(".answer-btns").style.display = "block"; // Show answer buttons
  nextBtn.textContent = "Next"; // Reset button text to "Next"
  nextBtn.style.display = "none"; // Hide the next button initially

  loadQuestion(currentQuestionIndex); // Load the first question again

  // Clear onclick to prevent multiple clicks
  nextBtn.onclick = null;
}

// Initialize the quiz
loadQuestion(currentQuestionIndex);
