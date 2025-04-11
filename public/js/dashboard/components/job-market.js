// Job Market Component
function renderJobMarket() {
  return `
    <div class="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Job Market Snapshot</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="border rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">Full Stack Developer</h3>
                <div class="space-y-3">
                    <div>
                        <p class="text-sm text-gray-600">Current Demand</p>
                        <div class="flex items-center mt-1">
                            <div class="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                <div class="bg-green-600 h-2.5 rounded-full" style="width: 85%"></div>
                            </div>
                            <span class="text-sm font-medium text-gray-700">High</span>
                        </div>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Average Salary</p>
                        <p class="text-lg font-medium text-gray-800">$105,000</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Top Hiring Regions</p>
                        <div class="flex flex-wrap mt-1">
                            <span class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-1 mb-1">San Francisco</span>
                            <span class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-1 mb-1">New York</span>
                            <span class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-1 mb-1">Austin</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- More job market data -->
        </div>
        <div id="salary-trends-container" class="mt-6"></div>
    </div>
  `;
}