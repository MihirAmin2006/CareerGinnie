function renderResumeAssistant() {
    return `
        <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Resume Assistant</h2>
            
            <div class="mb-8">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-semibold">Your Resume</h3>
                    <button class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                        Edit Resume
                    </button>
                </div>
                
                <div class="border rounded-lg p-4 bg-gray-50">
                    <div class="flex items-center mb-4">
                        <svg class="h-10 w-10 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <div>
                            <h4 class="font-medium">My Professional Resume</h4>
                            <p class="text-sm text-gray-500">Last updated: 2 days ago</p>
                        </div>
                        <div class="ml-auto">
                            <button class="text-indigo-600 hover:text-indigo-800 mr-3">
                                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                </svg>
                            </button>
                            <button class="text-indigo-600 hover:text-indigo-800">
                                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="mt-2">
                        <div class="w-full bg-gray-200 rounded-full h-2.5">
                            <div class="bg-green-600 h-2.5 rounded-full" style="width: 85%"></div>
                        </div>
                        <p class="text-sm text-gray-600 mt-1">Resume Strength: 85%</p>
                    </div>
                </div>
            </div>
            
            <div class="mb-6">
                <h3 class="text-xl font-semibold mb-4">Improvement Suggestions</h3>
                <ul class="space-y-3">
                    <li class="flex items-start">
                        <svg class="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                        <div>
                            <p class="text-gray-700 font-medium">Add more quantifiable achievements</p>
                            <p class="text-sm text-gray-500">Use numbers and metrics to demonstrate your impact</p>
                        </div>
                    </li>
                    <li class="flex items-start">
                        <svg class="h-5 w-5 text-yellow-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                        <div>
                            <p class="text-gray-700 font-medium">Improve your skills section</p>
                            <p class="text-sm text-gray-500">Add more relevant technical skills for your target roles</p>
                        </div>
                    </li>
                </ul>
            </div>
            
            <div>
                <h3 class="text-xl font-semibold mb-4">Resume Templates</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                        <div class="h-32 bg-gray-100 rounded mb-2 flex items-center justify-center">
                            <span class="text-gray-400">Professional</span>
                        </div>
                        <p class="text-center text-sm font-medium">Professional</p>
                    </div>
                    <div class="border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                        <div class="h-32 bg-gray-100 rounded mb-2 flex items-center justify-center">
                            <span class="text-gray-400">Creative</span>
                        </div>
                        <p class="text-center text-sm font-medium">Creative</p>
                    </div>
                    <div class="border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                        <div class="h-32 bg-gray-100 rounded mb-2 flex items-center justify-center">
                            <span class="text-gray-400">Executive</span>
                        </div>
                        <p class="text-center text-sm font-medium">Executive</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}