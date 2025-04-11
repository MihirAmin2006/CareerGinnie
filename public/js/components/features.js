document.addEventListener('DOMContentLoaded', function() {
  const featuresContainer = document.getElementById('features-container');
  
  featuresContainer.innerHTML = `
    <section id="features" class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900">
            Unlock Your Career Potential
          </h2>
          <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive tools and insights help you make informed career
            decisions.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Feature 1 -->
          <div class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <i class="ri-bar-chart-grouped-line ri-lg text-primary"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Skills Assessment
            </h3>
            <p class="text-gray-600">
              Identify your strengths and areas for growth with our
              comprehensive skills analysis tools.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <i class="ri-briefcase-line ri-lg text-primary"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Job Matching
            </h3>
            <p class="text-gray-600">
              Discover opportunities that align with your skills, experience,
              and career aspirations.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <i class="ri-funds-line ri-lg text-primary"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Salary Insights
            </h3>
            <p class="text-gray-600">
              Get accurate compensation data to negotiate confidently and plan
              your financial future.
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <i class="ri-book-open-line ri-lg text-primary"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              Learning Resources
            </h3>
            <p class="text-gray-600">
              Access curated content to develop in-demand skills and advance
              your career.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
});