document.addEventListener('DOMContentLoaded', function() {
  const heroContainer = document.getElementById('hero-container');
  
  heroContainer.innerHTML = `
    <section class="pt-24 pb-16 md:pb-24 relative overflow-hidden" style="
      background-image: url('https://readdy.ai/api/search-image?query=abstract%20modern%20gradient%20background%20with%20subtle%20geometric%20shapes%20and%20patterns%2C%20professional%20blue%20and%20teal%20color%20scheme%2C%20clean%20minimalist%20design%2C%20suitable%20for%20career%20website%2C%20ensure%20left%20side%20is%20lighter%20for%20text%20visibility%2C%20right%20side%20can%20have%20more%20visual%20elements&width=1920&height=800&seq=hero1&orientation=landscape');
      background-size: cover;
      background-position: center;
    ">
      <div class="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="flex flex-col md:flex-row items-center">
          <div class="w-full md:w-1/2 pt-8 md:pt-16 pb-8">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Navigate Your Career Journey With Confidence
            </h1>
            <p class="mt-4 text-lg text-gray-600 max-w-xl">
              Discover personalized career paths, gain valuable skills insights,
              and connect with opportunities that align with your aspirations.
            </p>
            <div class="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#" class="px-6 py-3 text-base font-medium text-white bg-primary hover:bg-opacity-90 !rounded-button text-center whitespace-nowrap">Get Started Free</a>
              <a href="#" class="px-6 py-3 text-base font-medium text-primary border border-primary hover:bg-primary/5 !rounded-button text-center whitespace-nowrap">Explore Features</a>
            </div>
          </div>
          <div class="w-full md:w-1/2 md:pl-8">
            <!-- Hero image is part of the background -->
          </div>
        </div>
      </div>
    </section>
  `;
});