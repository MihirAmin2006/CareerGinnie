document.addEventListener('DOMContentLoaded', function() {
  const jobMatchingContainer = document.getElementById('job-matching-container');
  
  jobMatchingContainer.innerHTML = `
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900">
            Find Your Perfect Career Match
          </h2>
          <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our intelligent job matching algorithm connects you with
            opportunities that align with your skills and aspirations.
          </p>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Filters Sidebar -->
          <div class="w-full lg:w-64 bg-white rounded-lg shadow-sm border border-gray-100 h-fit">
            <!-- Job filters -->
            <!-- ... Filters content (truncated for brevity) ... -->
          </div>

          <!-- Job listings -->
          <div class="flex-1">
            <!-- ... Job listings content (truncated for brevity) ... -->
          </div>
        </div>
      </div>
    </section>
  `;
});