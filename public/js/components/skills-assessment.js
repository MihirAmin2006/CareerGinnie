document.addEventListener('DOMContentLoaded', function() {
  const skillsAssessmentContainer = document.getElementById('skills-assessment-container');
  
  skillsAssessmentContainer.innerHTML = `
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="md:flex md:items-center md:justify-between mb-12">
          <div class="md:w-1/2">
            <h2 class="text-3xl font-bold text-gray-900">
              Discover Your Professional Strengths
            </h2>
            <p class="mt-4 text-lg text-gray-600">
              Our comprehensive skills assessment helps you identify your
              strengths and areas for growth.
            </p>
          </div>
          <div class="mt-6 md:mt-0 md:w-1/3">
            <img
              src="https://readdy.ai/api/search-image?query=person%20analyzing%20data%20on%20computer%20screen%20with%20charts%20and%20graphs%2C%20professional%20setting%2C%20modern%20office%20environment%2C%20focused%20on%20career%20development%2C%20clean%20professional%20look&width=600&height=400&seq=skills1&orientation=landscape"
              alt="Skills Assessment"
              class="rounded-lg shadow-md w-full h-auto object-cover object-top"
            />
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mt-8">
          <!-- Skills assessment form -->
          <!-- ... Skills assessment content (truncated for brevity) ... -->
        </div>
      </div>
    </section>
  `;
});