document.addEventListener("DOMContentLoaded", function () {
  // Initialize sidebar
  initSkillAssessment();

  // Setup event listeners
  setupEventListeners();

  // Handle logout
  setupLogout();
});

function initSkillAssessment() {
  const mainContent = document.querySelector(".flex-1");
  const sidebarContainer = document.querySelector(".flex.min-h-screen");

  // Insert sidebar before main content if it doesn't exist
  if (sidebarContainer && !document.querySelector('.bg-indigo-800.text-white')) {
    sidebarContainer.insertAdjacentHTML('afterbegin', renderSidebar());
    sidebarContainer.insertAdjacentHTML('afterbegin', renderMobileMenu());
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
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Current Occupation</label>
            <input type="text" name="occupation" required
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Software Developer, Data Scientist">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
            <select name="experience" required
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Select Experience Level</option>
              <option value="0-1">Less than 1 year</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Primary Skills</label>
            <div class="grid grid-cols-2 gap-4" id="skills-grid">
              <div class="flex items-center">
                <input type="checkbox" name="skills[]" value="javascript" class="mr-2">
                <label>JavaScript</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" name="skills[]" value="python" class="mr-2">
                <label>Python</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" name="skills[]" value="java" class="mr-2">
                <label>Java</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" name="skills[]" value="react" class="mr-2">
                <label>React</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" name="skills[]" value="node" class="mr-2">
                <label>Node.js</label>
              </div>
              <div class="flex items-center">
                <input type="checkbox" name="skills[]" value="sql" class="mr-2">
                <label>SQL</label>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Additional Skills</label>
            <textarea name="additionalSkills" 
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="List any other skills you have (comma separated)"
              rows="3"></textarea>
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

// Add this new function to handle form submission
function setupProfileFormHandler() {
  const form = document.getElementById('user-profile-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const profileData = {
      occupation: formData.get('occupation'),
      experience: formData.get('experience'),
      skills: formData.getAll('skills[]'),
      additionalSkills: formData.get('additionalSkills')
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0)
    };

    try {
      // Save profile data
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      // Load assessments based on profile
      loadAssessments();
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  });
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
  const assessmentList = document.getElementById('assessment-list');
  
  try {
    const response = await fetch('/api/assessments');
    const assessments = await response.json();
    
    if (assessments.length === 0) {
      assessmentList.innerHTML = `
        <div class="text-center py-8">
          <p class="text-gray-600">No assessments available at the moment.</p>
        </div>
      `;
      return;
    }

    assessmentList.innerHTML = assessments.map(assessment => 
      renderAssessmentCard(
        assessment.title,
        assessment.description,
        assessment.questionCount
      )
    ).join('');

    // Setup event listeners for the new assessment buttons
    setupAssessmentButtons();
  } catch (error) {
    console.error('Error loading assessments:', error);
    assessmentList.innerHTML = `
      <div class="text-center py-8">
        <p class="text-red-600">Failed to load assessments. Please try again later.</p>
      </div>
    `;
  }
}

function setupAssessmentButtons() {
  const buttons = document.querySelectorAll('.assessment-btn');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
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
    const response = await fetch(`/api/assessments/${encodeURIComponent(assessmentTitle)}`);
    const assessment = await response.json();

    // Initialize assessment interface
    initializeAssessmentInterface(assessment);
  } catch (error) {
    console.error('Error starting assessment:', error);
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
