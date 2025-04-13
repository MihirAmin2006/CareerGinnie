document.addEventListener("DOMContentLoaded", function () {
  // Initialize sidebar
  initResources();

  // Setup event listeners
  setupEventListeners();

  // Handle logout
  setupLogout();
  
  // Setup dark mode - commented out
  // setupDarkMode();
});

function initResources() {
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

  // Add resources content
  if (mainContent) {
    mainContent.innerHTML = `
      <div class="container mx-auto px-4 py-6">
        ${renderResources()}
      </div>
    `;
  }
}

function renderResources() {
  return `
    <div class="bg-white rounded-lg shadow-md p-6" >
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Career Resources</h2>
      
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-4">Learning Platforms</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-center mb-3">
              <div class="bg-blue-100 rounded-full p-2 mr-3">
                <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h4 class="font-medium text-lg">Coursera</h4>
            </div>
            <p class="text-gray-600 mb-3">Access thousands of courses from top universities and companies.</p>
            <a href="https://www.coursera.org" target="_blank" class="text-indigo-600 hover:text-indigo-800 font-medium">Visit Website →</a>
          </div>
          
          <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-center mb-3">
              <div class="bg-green-100 rounded-full p-2 mr-3">
                <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h4 class="font-medium text-lg">Udemy</h4>
            </div>
            <p class="text-gray-600 mb-3">Practical, skill-based courses for professional development.</p>
            <a href="https://www.udemy.com" target="_blank" class="text-indigo-600 hover:text-indigo-800 font-medium">Visit Website →</a>
          </div>
          
          <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-center mb-3">
              <div class="bg-yellow-100 rounded-full p-2 mr-3">
                <svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h4 class="font-medium text-lg">LinkedIn Learning</h4>
            </div>
            <p class="text-gray-600 mb-3">Business, creative, and technology courses for professionals.</p>
            <a href="https://www.linkedin.com/learning" target="_blank" class="text-indigo-600 hover:text-indigo-800 font-medium">Visit Website →</a>
          </div>
        </div>
      </div>
      
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-4">Job Search Platforms</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-center mb-3">
              <div class="bg-indigo-100 rounded-full p-2 mr-3">
                <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h4 class="font-medium text-lg">LinkedIn Jobs</h4>
            </div>
            <p class="text-gray-600 mb-3">Connect with recruiters and find jobs through your professional network.</p>
            <a href="https://www.linkedin.com/jobs" target="_blank" class="text-indigo-600 hover:text-indigo-800 font-medium">Visit Website →</a>
          </div>
          
          <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-center mb-3">
              <div class="bg-blue-100 rounded-full p-2 mr-3">
                <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
              <h4 class="font-medium text-lg">Indeed</h4>
            </div>
            <p class="text-gray-600 mb-3">Search millions of jobs from thousands of job boards and company websites.</p>
            <a href="https://www.indeed.com" target="_blank" class="text-indigo-600 hover:text-indigo-800 font-medium">Visit Website →</a>
          </div>
          
          <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-center mb-3">
              <div class="bg-green-100 rounded-full p-2 mr-3">
                <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h4 class="font-medium text-lg">Glassdoor</h4>
            </div>
            <p class="text-gray-600 mb-3">Find jobs and research companies with employee reviews and salary data.</p>
            <a href="https://www.glassdoor.com" target="_blank" class="text-indigo-600 hover:text-indigo-800 font-medium">Visit Website →</a>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4">Career Development</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 class="font-medium text-lg mb-2">Interview Preparation</h4>
            <ul class="space-y-2 mb-4">
              <li class="flex items-start">
                <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <a href="#" class="text-indigo-600 hover:text-indigo-800">Common Interview Questions</a>
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <a href="#" class="text-indigo-600 hover:text-indigo-800">Behavioral Interview Guide</a>
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <a href="#" class="text-indigo-600 hover:text-indigo-800">Technical Interview Preparation</a>
              </li>
            </ul>
          </div>
          
          <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 class="font-medium text-lg mb-2">Networking Resources</h4>
            <ul class="space-y-2 mb-4">
              <li class="flex items-start">
                <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <a href="#" class="text-indigo-600 hover:text-indigo-800">Professional Networking Guide</a>
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <a href="#" class="text-indigo-600 hover:text-indigo-800">Industry Events Calendar</a>
              </li>
              <li class="flex items-start">
                <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <a href="#" class="text-indigo-600 hover:text-indigo-800">LinkedIn Profile Optimization</a>
              </li>
            </ul>
          </div>
        </div>
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

/* Commenting out the setupDarkMode function
function setupDarkMode() {
  const darkModeToggle = document.getElementById("theme-toggle-sidebar");

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      // Re-render content with new theme
      const mainContent = document.querySelector(".flex-1");
      if (mainContent) {
        mainContent.innerHTML = `
          <div class="container mx-auto px-4 py-6">
            ${renderResources()}
          </div>
        `;
      }

      // Refresh sidebar
      refreshSidebar();
    });
  }
  
  // Apply saved theme on load
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
}
*/

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