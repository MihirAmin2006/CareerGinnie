// Mobile Menu Component
function renderMobileMenu() {
  return `
    <div class="md:hidden bg-indigo-800 text-white w-full p-4 flex justify-between items-center">
        <h1 class="text-xl font-bold">CarrierGeinie</h1>
        <button id="mobile-menu-button" class="focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>
    </div>

    <div id="mobile-menu" class="hidden md:hidden fixed inset-0 bg-indigo-800 z-50 pt-16">
        <nav class="p-4">
            <a href="/dashboard" class="block py-3 px-4 bg-indigo-900 text-white rounded mb-2">Dashboard</a>
            <a href="/skill-assessment" class="block py-3 px-4 text-white hover:bg-indigo-700 rounded mb-2">Skill Assessment</a>
            <a href="/career-match" class="block py-3 px-4 text-white hover:bg-indigo-700 rounded mb-2">Career Match</a>
            <a href="/resume-assistant" class="block py-3 px-4 text-white hover:bg-indigo-700 rounded mb-2">Resume Assistant</a>
            <a href="/resources" class="block py-3 px-4 text-white hover:bg-indigo-700 rounded mb-2">Resources</a>
            <a href="/settings" class="block py-3 px-4 text-white hover:bg-indigo-700 rounded mb-2">Settings</a>
            <a href="/logout" class="block py-3 px-4 text-white hover:bg-indigo-700 rounded mt-8">Logout</a>
        </nav>
    </div>
  `;
}