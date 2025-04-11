// Goal Tracker Component
function renderGoalTracker() {
  return `
    <div class="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Weekly Goal Tracker</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="border rounded-lg p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-md font-medium text-gray-800">Complete 2 Skill Quizzes</h3>
                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">1/2</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div class="bg-green-600 h-2.5 rounded-full" style="width: 50%"></div>
                </div>
                <p class="text-xs text-gray-600">Due in 3 days</p>
            </div>
            <!-- More goals -->
        </div>
        <div class="mt-4 text-center">
            <button class="text-sm text-indigo-600 hover:text-indigo-800 font-medium">Set New Goal</button>
        </div>
    </div>
  `;
}