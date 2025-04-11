// Career Paths Component
function renderCareerPaths() {
  return `
    <div class="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Suggested Career Paths</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                    <h3 class="text-lg font-semibold text-gray-800">Full Stack Developer</h3>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">94% Match</span>
                </div>
                <p class="text-sm text-gray-600 mt-2">Build and maintain both front-end and back-end components of web applications using your JavaScript, React, and Node.js skills.</p>
                <div class="mt-4">
                    <button class="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                        Explore More
                        <svg class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <!-- More career paths -->
        </div>
    </div>
  `;
}