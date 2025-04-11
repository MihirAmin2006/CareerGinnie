document.addEventListener('DOMContentLoaded', function() {
    const dashboardPreviewContainer = document.getElementById('dashboard-preview-container');
    
    dashboardPreviewContainer.innerHTML = `
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <div class="p-6">
                        <h2 class="text-2xl font-bold text-gray-900 mb-4">Salary Trends</h2>
                        <div id="salary-chart" style="width: 100%; height: 400px;"></div>
                    </div>
                </div>
            </div>
        </section>
    `;
});