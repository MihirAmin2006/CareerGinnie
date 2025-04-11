// User Overview Component
function renderUserOverview(userData = {
  name: "John Smith",
  initials: "JS",
  skillScore: 78
}) {
  return `
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex flex-col md:flex-row md:items-center">
            <div class="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <div class="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span class="text-3xl font-bold text-indigo-600" id="user-initials">${userData.initials}</span>
                </div>
            </div>
            <div class="flex-grow">
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Welcome back, <span id="user-name">${userData.name}</span>!</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                        <h3 class="text-sm font-medium text-gray-500">Skill Score</h3>
                        <div class="flex items-center mt-1">
                            <div class="text-xl font-semibold text-gray-800 mr-2" id="skill-score">${userData.skillScore}</div>
                            <div class="text-sm text-green-600">(Advanced)</div>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-sm font-medium text-gray-500">Career Matches</h3>
                        <div class="text-xl font-semibold text-gray-800 mt-1">4</div>
                    </div>
                    <div>
                        <h3 class="text-sm font-medium text-gray-500">Profile Completion</h3>
                        <div class="flex items-center mt-1">
                            <div class="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                <div class="bg-indigo-600 h-2.5 rounded-full" style="width: 85%"></div>
                            </div>
                            <span class="text-sm font-medium text-gray-700">85%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;
}