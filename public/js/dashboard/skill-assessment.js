document.addEventListener("DOMContentLoaded", function () {
  // Initialize sidebar
  initSkillAssessment();

  // Setup profile form handler (add this line)
  setupProfileFormHandler();

  // Setup event listeners
  setupEventListeners();

  // Handle logout
  setupLogout();
});

function initSkillAssessment() {
  const mainContent = document.querySelector(".flex-1");
  const sidebarContainer = document.querySelector(".flex.min-h-screen");

  // Insert sidebar before main content if it doesn't exist
  if (
    sidebarContainer &&
    !document.querySelector(".bg-indigo-800.text-white")
  ) {
    sidebarContainer.insertAdjacentHTML("afterbegin", renderSidebar());
    sidebarContainer.insertAdjacentHTML("afterbegin", renderMobileMenu());
  }

  // Add user profile collection first
  if (mainContent) {
    mainContent.innerHTML = renderUserProfileForm();
  }
}

function renderUserProfileForm() {
  return `
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Professional Profile</h1>
      
      <div class="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
        <form id="user-profile-form" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Current Occupation</label>
              <input type="text" name="occupation" required
                class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Software Developer">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <select name="industry" required class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance & Banking</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="retail">Retail & E-commerce</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <select name="experience" required class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">Select Experience Level</option>
                <option value="0-1">Less than 1 year</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
              <select name="education" required class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">Select Education Level</option>
                <option value="high-school">High School</option>
                <option value="associate">Associate Degree</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="phd">Ph.D.</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
            <input type="text" name="fieldOfStudy" 
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Computer Science, Business Administration">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Career Goals</label>
            <textarea name="careerGoals" 
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="What are your career aspirations? Where do you see yourself in the next few years?"
              rows="3"></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Primary Skills</label>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4" id="skills-grid">
              ${renderSkillsCheckboxes()}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Additional Skills</label>
            <textarea name="additionalSkills" 
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="List any other skills you have (comma separated)"
              rows="3"></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Work Environment</label>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center">
                <input type="checkbox" name="workPreferences[]" value="remote" class="mr-2">
                <label>Remote Work</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" name="workPreferences[]" value="office" class="mr-2">
                <label>Office-based</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" name="workPreferences[]" value="hybrid" class="mr-2">
                <label>Hybrid</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" name="workPreferences[]" value="flexible" class="mr-2">
                <label>Flexible Hours</label>
              </div>
            </div>
          </div>

          <button type="submit" 
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors">
            Continue to Assessment
          </button>
        </form>
      </div>
    </div>
  `;
}

// Add this helper function for skills checkboxes
function renderSkillsCheckboxes() {
  const skills = [
    "JavaScript",
    "Python",
    "Java",
    "React",
    "Node.js",
    "SQL",
    "AWS",
    "Docker",
    "Git",
    "DevOps",
    "Machine Learning",
    "Data Analysis",
    "UI/UX Design",
    "Agile",
    "Project Management",
    "Cloud Computing",
  ];

  return skills
    .map(
      (skill) => `
    <div class="flex items-center">
      <input type="checkbox" name="skills[]" value="${skill.toLowerCase()}" class="mr-2">
      <label>${skill}</label>
    </div>
  `
    )
    .join("");
}

// Add this new function to handle form submission
// Add mock quiz data
// Add more comprehensive mock data
const quizQuestions = {
  javascript: [
    {
      question: "What is the output of typeof []?",
      options: ["array", "object", "undefined", "null"],
      correctAnswer: 1,
    },
    {
      question: "Which method adds elements to the end of an array?",
      options: ["push()", "unshift()", "pop()", "shift()"],
      correctAnswer: 0,
    },
    {
      question: "What is closure in JavaScript?",
      options: [
        "A way to protect variables from being modified",
        "A function that has access to variables in its outer scope",
        "A method to close browser windows",
        "A way to end JavaScript code execution",
      ],
      correctAnswer: 1,
    },
  ],
  python: [
    {
      question: "What is the correct way to create a list in Python?",
      options: ["list = []", "list = ()", "list = {}", "list = ''"],
      correctAnswer: 0,
    },
    {
      question: "Which of these is not a Python data type?",
      options: ["int", "float", "varchar", "bool"],
      correctAnswer: 2,
    },
  ],
  react: [
    {
      question: "What hook is used for side effects in React?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      correctAnswer: 1,
    },
  ],
};

// Update form submission handler
// Add this testing function
function testQuizApp() {
  // Test case 1: Single skill selection
  console.log("Test Case 1: Single Skill Selection");
  const singleSkillProfile = {
    occupation: "Developer",
    experience: "3-5",
    skills: ["javascript"],
    additionalSkills: "",
  };
  const questions1 = generateQuestions(singleSkillProfile.skills);
  console.log(`Generated ${questions1.length} JavaScript questions`);

  // Test case 2: Multiple skills selection
  console.log("\nTest Case 2: Multiple Skills Selection");
  const multiSkillProfile = {
    occupation: "Full Stack Developer",
    experience: "5-10",
    skills: ["javascript", "python", "react"],
    additionalSkills: "",
  };
  const questions2 = generateQuestions(multiSkillProfile.skills);
  console.log(`Generated ${questions2.length} total questions`);

  // Test case 3: No skills selected
  console.log("\nTest Case 3: No Skills Selected");
  const noSkillProfile = {
    occupation: "Student",
    experience: "0-1",
    skills: [],
    additionalSkills: "",
  };
  const questions3 = generateQuestions(noSkillProfile.skills);
  console.log(`Generated ${questions3.length} questions (should be 0)`);
}

// Add this to your setupProfileFormHandler
function setupProfileFormHandler() {
  // Wait a short moment for the form to be rendered
  setTimeout(() => {
    const form = document.getElementById("user-profile-form");
    if (!form) return;

    // Add test button
    const testButton = document.createElement("button");
    testButton.textContent = "Test Quiz";
    testButton.type = "button";
    testButton.className = "w-full mt-4 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors";
    testButton.addEventListener("click", () => {
      const testData = {
        occupation: "Test Developer",
        experience: "3-5",
        skills: ["javascript", "python", "react"],
        additionalSkills: []
      };
      localStorage.setItem('userProfile', JSON.stringify(testData));
      window.location.href = "/quiz.html";
    });
    form.appendChild(testButton);

    // Existing form submit handler
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const profileData = {
        occupation: formData.get("occupation"),
        experience: formData.get("experience"),
        skills: formData.getAll("skills[]"),
        additionalSkills: formData
          .get("additionalSkills")
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0),
      };

      // Save profile data and redirect
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      window.location.href = "/quiz.html";
    });
  }, 100);
}

function startQuiz(profileData) {
  const mainContent = document.querySelector(".flex-1");
  if (!mainContent) return;

  // Generate questions based on selected skills
  const questions = generateQuestions(profileData.skills);

  mainContent.innerHTML = `
    <div class="container mx-auto px-4 py-6">
      <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-800">Skill Assessment</h2>
            <div class="text-sm text-gray-600">
              Question <span id="current-question-num">1</span> of <span id="total-questions">${questions.length}</span>
            </div>
          </div>

          <div id="quiz-container" class="space-y-6">
            <!-- Questions will be rendered here -->
          </div>

          <div class="flex justify-between mt-6">
            <button id="prev-question" class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50">
              Previous
            </button>
            <button id="next-question" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  initializeQuiz(questions);
}

function generateQuestions(selectedSkills) {
  let questions = [];
  selectedSkills.forEach((skill) => {
    if (quizQuestions[skill.toLowerCase()]) {
      questions = questions.concat(quizQuestions[skill.toLowerCase()]);
    }
  });
  return questions;
}

function initializeQuiz(questions) {
  if (questions.length === 0) {
    const mainContent = document.querySelector(".flex-1");
    mainContent.innerHTML = `
      <div class="container mx-auto px-4 py-6">
        <div class="max-w-2xl mx-auto">
          <div class="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 class="text-2xl font-bold mb-4">No Questions Available</h2>
            <p class="text-gray-600 mb-6">Please select at least one skill to start the assessment.</p>
            <button onclick="initSkillAssessment()" 
              class="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors">
              Return to Profile
            </button>
          </div>
        </div>
      </div>
    `;
    return;
  }

  let currentQuestionIndex = 0;
  const answers = new Array(questions.length).fill(null);

  function updateQuestion() {
    const container = document.getElementById("quiz-container");
    const question = questions[currentQuestionIndex];

    if (!container || !question) return;

    container.innerHTML = `
      <div class="question-container">
        <p class="text-lg font-medium mb-4">${question.question}</p>
        <div class="space-y-3">
          ${question.options
            .map(
              (option, index) => `
            <div class="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
              <input type="radio" id="option${index}" name="answer" value="${index}" 
                ${answers[currentQuestionIndex] === index ? "checked" : ""} 
                class="mr-3">
              <label for="option${index}" class="cursor-pointer flex-1">${option}</label>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    // Add click handlers for the option containers
    const optionContainers = container.querySelectorAll(".flex.items-center");
    optionContainers.forEach((container) => {
      container.addEventListener("click", () => {
        const radio = container.querySelector('input[type="radio"]');
        radio.checked = true;
        answers[currentQuestionIndex] = parseInt(radio.value);
      });
    });

    // Update navigation buttons
    const prevButton = document.getElementById("prev-question");
    const nextButton = document.getElementById("next-question");

    if (prevButton && nextButton) {
      prevButton.disabled = currentQuestionIndex === 0;
      nextButton.textContent =
        currentQuestionIndex === questions.length - 1 ? "Finish" : "Next";

      const currentNum = document.getElementById("current-question-num");
      if (currentNum) {
        currentNum.textContent = currentQuestionIndex + 1;
      }
    }
  }

  // Setup navigation
  const prevButton = document.getElementById("prev-question");
  const nextButton = document.getElementById("next-question");

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        updateQuestion();
      }
    });

    nextButton.addEventListener("click", () => {
      const selectedAnswer = document.querySelector(
        'input[name="answer"]:checked'
      );
      if (selectedAnswer) {
        answers[currentQuestionIndex] = parseInt(selectedAnswer.value);
      }

      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        updateQuestion();
      } else {
        showResults(questions, answers);
      }
    });
  }

  // Show first question
  updateQuestion();
}

function showResults(questions, answers) {
  const score = answers.reduce((total, answer, index) => {
    return total + (answer === questions[index].correctAnswer ? 1 : 0);
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  const mainContent = document.querySelector(".flex-1");
  mainContent.innerHTML = `
    <div class="container mx-auto px-4 py-6">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 class="text-2xl font-bold mb-4">Assessment Complete!</h2>
          <div class="text-6xl font-bold text-indigo-600 mb-4">${percentage}%</div>
          <p class="text-gray-600 mb-6">You answered ${score} out of ${questions.length} questions correctly.</p>
          <button onclick="initSkillAssessment()" 
            class="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors">
            Return to Profile
          </button>
        </div>
      </div>
    </div>
  `;
}

// Update the event listeners setup
function setupEventListeners() {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Setup profile form handler
  setupProfileFormHandler();
}

async function loadAssessments() {
  const assessmentList = document.getElementById("assessment-list");

  try {
    const response = await fetch("/api/assessments");
    const assessments = await response.json();

    if (assessments.length === 0) {
      assessmentList.innerHTML = `
        <div class="text-center py-8">
          <p class="text-gray-600">No assessments available at the moment.</p>
        </div>
      `;
      return;
    }

    assessmentList.innerHTML = assessments
      .map((assessment) =>
        renderAssessmentCard(
          assessment.title,
          assessment.description,
          assessment.questionCount
        )
      )
      .join("");

    // Setup event listeners for the new assessment buttons
    setupAssessmentButtons();
  } catch (error) {
    console.error("Error loading assessments:", error);
    assessmentList.innerHTML = `
      <div class="text-center py-8">
        <p class="text-red-600">Failed to load assessments. Please try again later.</p>
      </div>
    `;
  }
}

function setupAssessmentButtons() {
  const buttons = document.querySelectorAll(".assessment-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const assessmentTitle = this.dataset.assessment;
      startAssessment(assessmentTitle);
    });
  });
}

async function startAssessment(assessmentTitle) {
  const mainContent = document.querySelector(".flex-1");
  if (!mainContent) return;

  try {
    // Show loading state
    mainContent.innerHTML = `
      <div class="container mx-auto px-4 py-6 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p class="text-gray-600 mt-4">Loading assessment...</p>
      </div>
    `;

    // Fetch assessment data from backend
    const response = await fetch(
      `/api/assessments/${encodeURIComponent(assessmentTitle)}`
    );
    const assessment = await response.json();

    // Initialize assessment interface
    initializeAssessmentInterface(assessment);
  } catch (error) {
    console.error("Error starting assessment:", error);
    mainContent.innerHTML = `
      <div class="container mx-auto px-4 py-6 text-center">
        <p class="text-red-600">Failed to load assessment. Please try again later.</p>
        <button onclick="initSkillAssessment()" class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Return to Assessments
        </button>
      </div>
    `;
  }
}

function renderAssessmentCard(title, description, questionCount) {
  return `
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-lg font-semibold text-gray-800">${title}</h3>
          <p class="text-gray-600 mt-1">${description}</p>
          <div class="flex items-center mt-3">
            <span class="text-sm text-blue-600">${questionCount} Questions</span>
          </div>
        </div>
        <button 
          class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors assessment-btn"
          data-assessment="${title}">
          Start Assessment
        </button>
      </div>
    </div>
  `;
}

function setupEventListeners() {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Assessment buttons
  const assessmentButtons = document.querySelectorAll(".bg-indigo-600");
  assessmentButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const assessmentName =
        this.closest(".border").querySelector("h3").textContent;
      alert(`Starting assessment: ${assessmentName}`);
      // In a real app, this would navigate to the assessment page or open a modal
    });
  });
}

function setupLogout() {
  // Add logout handler
  const logoutLinks = document.querySelectorAll('a[href="/logout"]');

  logoutLinks.forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await firebase.auth().signOut();
        window.location.href = "/";
      } catch (error) {
        console.error("Error signing out:", error);
      }
    });
  });
}
