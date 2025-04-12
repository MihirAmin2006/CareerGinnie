// Sidebar Component
function renderSidebar() {
  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
  
  return `
    <aside class="w-64 ${isDarkMode ? 'bg-primary' : 'bg-primary'} text-white hidden md:block fixed left-0 top-0 h-screen flex flex-col transition-colors duration-300 z-10">
        <div class="p-6 border-b ${isDarkMode ? 'border-opacity-20' : 'border-opacity-20'} border-white">
            <h1 class="text-2xl font-bold">CareerGinnie</h1>
        </div>
        <nav class="mt-6 flex flex-col h-[calc(100vh-88px)] overflow-y-auto">
            <a href="/dashboard" class="flex items-center py-3 px-6 text-white ${isDarkMode ? 'hover:bg-opacity-20' : 'hover:bg-opacity-20'} hover:bg-white transition-colors">
                <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Dashboard
            </a>
            <a href="/skill-assessment" class="flex items-center py-3 px-6 text-white ${isDarkMode ? 'hover:bg-opacity-20' : 'hover:bg-opacity-20'} hover:bg-white transition-colors">
                <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                Skill Assessment
            </a>
            <a href="/career-match" class="flex items-center py-3 px-6 text-white ${isDarkMode ? 'hover:bg-opacity-20' : 'hover:bg-opacity-20'} hover:bg-white transition-colors">
                <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Career Match
            </a>
            <a href="/resume-assistant" class="flex items-center py-3 px-6 text-white ${isDarkMode ? 'hover:bg-opacity-20' : 'hover:bg-opacity-20'} hover:bg-white transition-colors">
                <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                Resume Assistant
            </a>
            <a href="/resources" class="flex items-center py-3 px-6 text-white ${isDarkMode ? 'hover:bg-opacity-20' : 'hover:bg-opacity-20'} hover:bg-white transition-colors">
                <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                Resources
            </a>
            <div class="mt-auto mb-6">
                <button id="theme-toggle-sidebar" class="flex items-center py-3 px-6 text-white ${isDarkMode ? 'hover:bg-opacity-20' : 'hover:bg-opacity-20'} hover:bg-white w-full transition-colors">
                    <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${isDarkMode ? 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' : 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'}"></path>
                    </svg>
                    ${isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <div class="border-t border-white border-opacity-20 my-2"></div>
                <a href="/logout" class="flex items-center py-3 px-6 text-white ${isDarkMode ? 'hover:bg-opacity-20' : 'hover:bg-opacity-20'} hover:bg-white transition-colors">
                    <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Logout
                </a>
            </div>
        </nav>
    </aside>
  `;
}