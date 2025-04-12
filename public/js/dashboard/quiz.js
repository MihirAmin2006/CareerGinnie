// Quiz configuration
const quizConfig = {
  apiUrl:
    "https://magicloops.dev/api/loop/4807e6bd-6824-4fda-b2f7-83fa2be4778c/run",
  defaultSkills: ["javascript", "python"],
  questionsPerSkill: 3, // Add this line to specify questions per skill
};

// Update fetchQuestions function

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let answers = []; // Add this line to track user answers

// Initialize quiz
async function initQuiz() {
  const mainContent = document.querySelector(
    ".bg-white.rounded-lg.shadow-lg.p-8"
  );
  try {
    showLoading(mainContent);
    const userProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");
    const skills = userProfile.skills || quizConfig.defaultSkills;

    questions = await fetchQuestions(skills);
    if (questions.length === 0) {
      showError(mainContent, "No questions available");
      return;
    }

    // Initialize answers array
    answers = new Array(questions.length).fill(undefined);
    showQuestion(mainContent);
  } catch (error) {
    showError(mainContent, "Failed to load quiz");
    console.error(error);
  }
}

// Update selectOption function
window.selectOption = function (selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const optionsContainer = document.getElementById("options");
  const nextButton = document.getElementById("next-btn");

  // Store the answer
  answers[currentQuestionIndex] = selectedIndex;

  optionsContainer.querySelectorAll("button").forEach((btn, index) => {
    btn.disabled = true;
    if (index === currentQuestion.correctAnswer) {
      btn.classList.add("border-green-600", "bg-green-50");
    } else if (
      index === selectedIndex &&
      selectedIndex !== currentQuestion.correctAnswer
    ) {
      btn.classList.add("border-red-600", "bg-red-50");
    }
  });

  if (selectedIndex === currentQuestion.correctAnswer) score++;
  nextButton.style.display = "block";
};

// Show loading state
function showLoading(container) {
  container.innerHTML = `
        <div class="flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            <span class="ml-3 text-lg text-gray-600">Loading questions...</span>
        </div>
    `;
}

// Show error message
function showError(container, message) {
  container.innerHTML = `
        <div class="text-center py-10">
            <div class="text-red-600 text-xl mb-4">${message}</div>
            <button onclick="location.reload()" 
                class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                Try Again
            </button>
        </div>
    `;
}

// Fetch questions from API
async function fetchQuestions(skills) {
    const allQuestions = [];
    
    for (const skill of skills) {
        for (let i = 0; i < quizConfig.questionsPerSkill; i++) {
            try {
                const response = await fetch(`${quizConfig.apiUrl}?data=${encodeURIComponent(
                    `Generate a technical quiz question about ${skill}. Include: question, four options labeled A to D, correct answer letter, and explanation.`
                )}`);
                
                if (!response.ok) throw new Error(`API Error: ${response.status}`);
                
                const data = await response.json();
                console.log('Raw API Response:', data);

                // Handle the new API response format
                if (data.quizQuestion) {
                    const questionData = data.quizQuestion;
                    allQuestions.push({
                        question: questionData.question,
                        options: [
                            questionData.options.A,
                            questionData.options.B,
                            questionData.options.C,
                            questionData.options.D
                        ],
                        correctAnswer: questionData.answer.charCodeAt(0) - 65,
                        explanation: questionData.explanation || '',
                        skill: skill
                    });
                }
            } catch (error) {
                console.error(`Failed to fetch question ${i + 1} for ${skill}:`, error);
            }
        }
    }
    
  // Fallback remains the same
  if (allQuestions.length === 0) {
    allQuestions.push({
      question: "What is JavaScript primarily used for?",
      options: [
        "Server-side programming only",
        "Client-side web development",
        "Database management",
        "Operating system development",
      ],
      correctAnswer: 1,
      explanation:
        "JavaScript is primarily used for client-side web development",
      skill: "javascript",
    });
  }

  return allQuestions;
}

// Display current question
function showQuestion(container) {
  const currentQuestion = questions[currentQuestionIndex];
  container.innerHTML = `
        <div class="mb-8">
            <div class="flex justify-between items-center mb-6">
                <span class="text-sm font-medium text-purple-600">${currentQuestion.skill.toUpperCase()}</span>
                <span class="text-sm text-gray-500">Question ${
                  currentQuestionIndex + 1
                }/${questions.length}</span>
            </div>
            <h2 class="text-xl font-semibold mb-6">${
              currentQuestion.question
            }</h2>
            <div class="space-y-4" id="options">
                ${currentQuestion.options
                  .map(
                    (option, index) => `
                    <button onclick="window.selectOption(${index})" 
                        class="w-full text-left p-4 rounded-lg border hover:border-purple-600 hover:bg-purple-50 transition-colors">
                        <span class="inline-block w-6 h-6 rounded-full border text-center mr-3">${String.fromCharCode(
                          65 + index
                        )}</span>
                        ${option}
                    </button>
                `
                  )
                  .join("")}
            </div>
        </div>
        <div class="flex justify-between mt-6">
            <button onclick="window.previousQuestion()" 
                class="px-6 py-2 rounded-lg border hover:bg-gray-50 ${
                  currentQuestionIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }">
                Previous
            </button>
            <button onclick="window.nextQuestion()" 
                class="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700" id="next-btn">
                ${
                  currentQuestionIndex === questions.length - 1
                    ? "Finish Quiz"
                    : "Next Question"
                }
            </button>
        </div>
    `;

  // Hide next button until an option is selected
  const nextButton = document.getElementById("next-btn");
  if (nextButton) {
    nextButton.style.display =
      answers[currentQuestionIndex] !== undefined ? "block" : "none";
  }
}

// Make navigation functions globally accessible
window.previousQuestion = function () {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion(document.querySelector(".bg-white.rounded-lg.shadow-lg.p-8"));
  }
};

window.nextQuestion = function () {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion(document.querySelector(".bg-white.rounded-lg.shadow-lg.p-8"));
  } else {
    showResults(document.querySelector(".bg-white.rounded-lg.shadow-lg.p-8"));
  }
};

// Show results
function showResults(container) {
    const percentage = Math.round((score / questions.length) * 100);
    container.innerHTML = `
        <div class="text-center py-10">
            <div class="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
                <span class="text-3xl font-bold text-purple-600">${percentage}%</span>
            </div>
            <h2 class="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p class="text-gray-600 mb-8">You got ${score} out of ${questions.length} questions correct</p>
            <div class="space-x-4">
                <button onclick="location.reload()" 
                    class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                    Try Again
                </button>
                <a href="../dashboard" 
                    class="inline-block border px-6 py-2 rounded-lg hover:bg-gray-50">
                    Back to Dashboard
                </a>
            </div>
        </div>
    `;
}

// Start quiz when DOM loads
document.addEventListener("DOMContentLoaded", initQuiz);
