document.addEventListener("DOMContentLoaded", function () {
  // Initialize sidebar
  initResumeAssistant();

  // Setup event listeners
  setupEventListeners();

  // Handle logout
  setupLogout();
  
  // Setup dark mode
  setupDarkMode();
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
  const editResumeBtn = document.querySelector('button:contains("Edit Resume")');
  if (editResumeBtn) {
    editResumeBtn.addEventListener('click', () => {
      // Open resume editor
      console.log('Opening resume editor...');
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