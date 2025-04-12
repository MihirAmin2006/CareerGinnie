// Mobile Menu Component
function renderMobileMenu() {
  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
  
  return `
    <div class="md:hidden ${isDarkMode ? 'bg-slate-800' : 'bg-indigo-800'} text-white w-full p-4 flex justify-between items-center transition-colors duration-300">
        <h1 class="text-xl font-bold">CareerGinnie</h1>
        <button id="mobile-menu-button" class="focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>
    </div>

    <div id="mobile-menu" class="hidden md:hidden fixed inset-0 ${isDarkMode ? 'bg-slate-800' : 'bg-indigo-800'} z-50 pt-16 transition-colors duration-300">
        <button id="mobile-menu-close" class="absolute top-4 right-4 text-white">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
        <nav class="p-4">
            <a href="/dashboard" class="block py-3 px-4 text-white ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-indigo-700'} rounded mb-2 transition-colors">
                <div class="flex items-center">
                    <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    Dashboard
                </div>
            </a>
            <a href="/skill-assessment" class="block py-3 px-4 text-white ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-indigo-700'} rounded mb-2 transition-colors">
                <div class="flex items-center">
                    <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                    Skill Assessment
                </div>
            </a>
            <a href="/career-match" class="block py-3 px-4 text-white ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-indigo-700'} rounded mb-2 transition-colors">
                <div class="flex items-center">
                    <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Career Match
                </div>
            </a>
            <a href="/resume-assistant" class="block py-3 px-4 text-white ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-indigo-700'} rounded mb-2 transition-colors">
                <div class="flex items-center">
                    <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    Resume Assistant
                </div>
            </a>
            <a href="/resources" class="block py-3 px-4 text-white ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-indigo-700'} rounded mb-2 transition-colors">
                <div class="flex items-center">
                    <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    Resources
                </div>
            </a>
            <div class="border-t ${isDarkMode ? 'border-slate-700' : 'border-indigo-700'} my-4"></div>
            <a href="/logout" class="block py-3 px-4 text-white ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-indigo-700'} rounded mb-2 transition-colors">
                <div class="flex items-center">
                    <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Logout
                </div>
            </a>
            <button id="theme-toggle-mobile" class="w-full py-3 px-4 text-white ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-indigo-700'} rounded mb-2 transition-colors text-left">
                <div class="flex items-center">
                    <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${isDarkMode ? 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' : 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'}"></path>
                    </svg>
                    ${isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </div>
            </button>
        </nav>
    </div>
  `;
}

// Add event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  document.addEventListener('click', function(e) {
    if (e.target.closest('#mobile-menu-button')) {
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
      }
    }
    
    if (e.target.closest('#mobile-menu-close')) {
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
      }
    }
  });
  
  // Theme toggle in mobile menu
  document.addEventListener('click', function(e) {
    if (e.target.closest('#theme-toggle-mobile')) {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Refresh the mobile menu
      const mobileMenuContainer = document.querySelector('.md\\:hidden').parentNode;
      const oldMobileMenu = document.querySelector('.md\\:hidden');
      if (oldMobileMenu) {
        oldMobileMenu.remove();
      }
      const oldMobileMenuContent = document.getElementById('mobile-menu');
      if (oldMobileMenuContent) {
        oldMobileMenuContent.remove();
      }
      
      // Insert updated mobile menu
      mobileMenuContainer.insertAdjacentHTML('afterbegin', renderMobileMenu());
    }
  });
});
