document.addEventListener('DOMContentLoaded', function() {
  const footerContainer = document.getElementById('footer-container');
  
  footerContainer.innerHTML = `
    <footer class="bg-gray-50 pt-16 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul class="mt-4 space-y-4">
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">About</a></li>
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Careers</a></li>
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul class="mt-4 space-y-4">
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Blog</a></li>
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Guides</a></li>
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul class="mt-4 space-y-4">
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Privacy</a></li>
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Terms</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase">Connect</h3>
            <ul class="mt-4 space-y-4">
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Twitter</a></li>
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">LinkedIn</a></li>
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Facebook</a></li>
            </ul>
          </div>
        </div>
        
        <div class="mt-12 pt-8 border-t border-gray-200">
          <p class="text-base text-gray-400 text-center">
            &copy; 2023 CareerCompass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `;
});