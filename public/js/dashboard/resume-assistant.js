document.addEventListener("DOMContentLoaded", function () {
  // Initialize sidebar
  initResumeAssistant();

  // Setup event listeners
  setupEventListeners();

  // Handle logout
  setupLogout();
  
  // Setup dark mode
  setupDarkMode();
  
  // Setup resume suggestion functionality
  setupResumeSuggestions();
});

function initResumeAssistant() {
  const mainContent = document.querySelector(".flex-1");
  const sidebarContainer = document.querySelector(".flex.min-h-screen");

  // Insert sidebar before main content if it doesn't exist
  if (
    sidebarContainer &&
    !document.querySelector(".bg-primary.text-white")
  ) {
    sidebarContainer.insertAdjacentHTML("afterbegin", renderSidebar());
    sidebarContainer.insertAdjacentHTML("afterbegin", renderMobileMenu());
  }

  // Add resume assistant content
  if (mainContent) {
    mainContent.innerHTML = `
      <div class="container mx-auto px-4 py-6">
        ${renderResumeAssistant()}
      </div>
    `;
  }
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
  
  // Add event listeners for resume buttons
  const editResumeBtn = document.querySelector('button#edit-resume-btn');
  if (editResumeBtn) {
    editResumeBtn.addEventListener('click', () => {
      // Open resume editor
      console.log('Opening resume editor...');
    });
  }
  
  const createResumeBtn = document.querySelector('button#create-resume-btn');
  if (createResumeBtn) {
    createResumeBtn.addEventListener('click', () => {
      // Create new resume
      console.log('Creating new resume...');
    });
  }
  
  const analyzeResumeBtn = document.querySelector('button#analyze-resume-btn');
  if (analyzeResumeBtn) {
    analyzeResumeBtn.addEventListener('click', () => {
      // Analyze resume
      console.log('Analyzing resume...');
    });
  }
  
  const atsCheckBtn = document.querySelector('button#ats-check-btn');
  if (atsCheckBtn) {
    atsCheckBtn.addEventListener('click', () => {
      // Check ATS compatibility
      console.log('Checking ATS compatibility...');
    });
  }
}

function setupResumeSuggestions() {
  // Import the LLAMA service
  import('/js/services/llamaService.js')
    .then(module => {
      const { generateResumeSuggestions, compareResumeWithJob } = module;
      
      // Get suggestions button
      const getSuggestionsBtn = document.getElementById('get-suggestions-btn');
      if (getSuggestionsBtn) {
        getSuggestionsBtn.addEventListener('click', async () => {
          const jobDescription = document.getElementById('job-description').value.trim();
          
          if (!jobDescription) {
            alert('Please enter a job description to get suggestions.');
            return;
          }
          
          // Show loading state
          getSuggestionsBtn.disabled = true;
          getSuggestionsBtn.textContent = 'Getting suggestions...';
          
          try {
            // Get user profile from localStorage or create a default one
            const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {
              fullName: 'Your Name',
              title: 'Your Professional Title',
              skills: ['Skill 1', 'Skill 2', 'Skill 3'],
              experience: 'Your experience details',
              education: 'Your education details',
              achievements: 'Your achievements'
            };
            
            // Get suggestions from LLAMA API
            const suggestions = await generateResumeSuggestions(userProfile, jobDescription);
            
            // Display suggestions
            const suggestionsResult = document.getElementById('suggestions-result');
            const suggestionsContent = document.getElementById('suggestions-content');
            
            suggestionsContent.innerHTML = suggestions.replace(/\n/g, '<br>');
            suggestionsResult.classList.remove('hidden');
            
            // Scroll to results
            suggestionsResult.scrollIntoView({ behavior: 'smooth' });
          } catch (error) {
            console.error('Error getting suggestions:', error);
            alert('An error occurred while getting suggestions. Please try again.');
          } finally {
            // Reset button state
            getSuggestionsBtn.disabled = false;
            getSuggestionsBtn.textContent = 'Get Suggestions';
          }
        });
      }
      
      // Compare resume with job description
      const compareBtn = document.getElementById('compare-btn');
      if (compareBtn) {
        compareBtn.addEventListener('click', async () => {
          const resumeText = document.getElementById('resume-text').value.trim();
          const jobDescription = document.getElementById('job-description-match').value.trim();
          
          if (!resumeText || !jobDescription) {
            alert('Please enter both your resume and the job description to compare.');
            return;
          }
          
          // Show loading state
          compareBtn.disabled = true;
          compareBtn.textContent = 'Comparing...';
          
          try {
            // Get comparison from LLAMA API
            const comparison = await compareResumeWithJob(resumeText, jobDescription);
            
            // Display comparison results
            const comparisonResult = document.getElementById('comparison-result');
            const comparisonContent = document.getElementById('comparison-content');
            
            comparisonContent.innerHTML = comparison.replace(/\n/g, '<br>');
            comparisonResult.classList.remove('hidden');
            
            // Scroll to results
            comparisonResult.scrollIntoView({ behavior: 'smooth' });
          } catch (error) {
            console.error('Error comparing resume with job:', error);
            alert('An error occurred while comparing. Please try again.');
          } finally {
            // Reset button state
            compareBtn.disabled = false;
            compareBtn.textContent = 'Compare Match';
          }
        });
      }
    })
    .catch(error => {
      console.error('Error importing LLAMA service:', error);
    });
}

function setupLogout() {
  // Look for any elements with logout or sign out text
  document.querySelectorAll('a, button').forEach(element => {
    const text = element.textContent.toLowerCase().trim();
    if (text === 'logout' || text === 'sign out' || text === 'log out') {
      element.addEventListener('click', handleLogout);
    }
  });
}

function handleLogout(e) {
  if (e) e.preventDefault();
  
  // Use the global firebase auth object
  if (typeof firebase !== 'undefined') {
    firebase.auth().signOut()
      .then(() => {
        // Redirect to index page
        window.location.href = '/index.html';
      })
      .catch(error => {
        console.error('Error signing out:', error);
        // Still redirect even if there's an error
        window.location.href = '/index.html';
      });
  } else {
    window.location.href = '/index.html';
  }
}

function setupDarkMode() {
  const darkModeToggle = document.getElementById("theme-toggle-sidebar");
  
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Refresh sidebar to update theme toggle button
      refreshSidebar();
    });
  }
}

function refreshSidebar() {
  const sidebarContainer = document.querySelector('.flex.min-h-screen');
  if (sidebarContainer) {
    // Remove old sidebar
    const oldSidebar = sidebarContainer.querySelector('aside');
    if (oldSidebar) {
      oldSidebar.remove();
    }
    
    // Remove old mobile menu
    const oldMobileMenu = document.querySelector('.md\\:hidden');
    if (oldMobileMenu) {
      oldMobileMenu.remove();
    }
    const oldMobileMenuContent = document.getElementById('mobile-menu');
    if (oldMobileMenuContent) {
      oldMobileMenuContent.remove();
    }
    
    // Insert updated components
    sidebarContainer.insertAdjacentHTML('afterbegin', renderSidebar());
    sidebarContainer.insertAdjacentHTML('afterbegin', renderMobileMenu());
  }
}