function renderCareerMatch() {
    return `
        <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Career Match</h2>
            
            <div class="mb-6">
                <p class="text-gray-600 mb-4">Based on your skills and preferences, here are your top career matches:</p>
                
                <div class="space-y-4">
                    ${renderCareerMatchCard('Software Engineer', 92, 'High demand in your area', ['JavaScript', 'React', 'Node.js'])}
                    ${renderCareerMatchCard('Data Scientist', 85, 'Growing field', ['Python', 'Machine Learning', 'Statistics'])}
                    ${renderCareerMatchCard('UX Designer', 78, 'Matches your creative skills', ['UI Design', 'User Research', 'Prototyping'])}
                </div>
            </div>
            
            <div class="mt-8">
                <h3 class="text-xl font-semibold mb-4">Improve Your Matches</h3>
                <p class="text-gray-600 mb-4">Complete these actions to get better career recommendations:</p>
                
                <ul class="space-y-2">
                    <li class="flex items-center text-gray-700">
                        <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Complete your skill assessment
                    </li>
                    <li class="flex items-center text-gray-700">
                        <svg class="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Update your work experience
                    </li>
                    <li class="flex items-center text-gray-700">
                        <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                        </svg>
                        Set your career preferences
                    </li>
                </ul>
            </div>
        </div>
    `;
}

function renderCareerMatchCard(title, matchPercentage, subtitle, skills) {
    return `
        <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="text-lg font-semibold text-gray-800">${title}</h3>
                    <p class="text-sm text-gray-500">${subtitle}</p>
                </div>
                <div class="bg-indigo-100 text-indigo-800 rounded-full h-10 w-10 flex items-center justify-center font-bold">
                    ${matchPercentage}%
                </div>
            </div>
            <div class="mt-4">
                <p class="text-xs text-gray-500 mb-2">Key Skills</p>
                <div class="flex flex-wrap gap-2">
                    ${skills.map(skill => `
                        <span class="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">${skill}</span>
                    `).join('')}
                </div>
            </div>
            <button class="mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                View Details
            </button>
        </div>
    `;
}