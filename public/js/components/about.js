document.addEventListener('DOMContentLoaded', function() {
    const aboutContainer = document.getElementById('about-container');
    
    aboutContainer.innerHTML = `
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center bg-white rounded-xl shadow-2xl p-8 transition-shadow duration-300 hover:shadow-3xl">
                    <div class="relative">
                        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">
                            Empowering Your Career Journey
                        </h2>
                        <p class="mt-4 text-lg text-gray-500">
                            CareerGinnie is your AI-powered career companion, designed to help you navigate your professional path with confidence. We combine cutting-edge technology with personalized guidance to ensure your success.
                        </p>
                        <div class="mt-8 space-y-4">
                            <div class="flex items-start">
                                <div class="flex-shrink-0">
                                    <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-medium text-gray-900">Personalized Career Guidance</h3>
                                    <p class="mt-2 text-base text-gray-500">Get tailored recommendations based on your skills, experience, and career goals.</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="flex-shrink-0">
                                    <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-medium text-gray-900">Real-time Market Insights</h3>
                                    <p class="mt-2 text-base text-gray-500">Stay informed about industry trends, salary benchmarks, and in-demand skills.</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="flex-shrink-0">
                                    <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-medium text-gray-900">Professional Development</h3>
                                    <p class="mt-2 text-base text-gray-500">Access resources and tools to enhance your skills and advance your career.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-10 lg:mt-0">
                        <div class="relative">
                            <dotlottie-player
  src="https://lottie.host/4545da0e-6f21-4597-8f7a-1b0041606119/hYUHIWG5Jr.lottie"
  background="transparent"
  speed="1"
  style="width: 500px; height: 500px"
  loop
  autoplay
></dotlottie-player>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
});