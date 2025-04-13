function renderResumeAssistant() {
  return `
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Resume Assistant</h1>
      <p class="text-gray-600">Create, optimize, and tailor your resume for job applications</p>
    </div>
    <div class="grid grid-cols-1 gap-6 mb-8">
      <!-- Resume Analyzer -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Resume Analyzer</h2>
        <p class="text-gray-600 mb-6">Get feedback and optimization suggestions for your resume</p>
        
        <div class="space-y-4">
          <div class="mb-4">
            <label for="resume-upload" class="block text-sm font-medium text-gray-700 mb-2">Upload Your Resume</label>
            <input type="file" id="resume-upload" accept=".pdf,.doc,.docx,.txt" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <p class="text-xs text-gray-500 mt-1">Supported formats: PDF, DOC, DOCX, TXT</p>
          </div>
          <div class="mb-4">
            <label for="resume-text-analyzer" class="block text-sm font-medium text-gray-700 mb-2">Or Paste Your Resume Text</label>
            <textarea id="resume-text-analyzer" rows="6" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Paste your resume text here..."></textarea>
          </div>
          <button id="analyze-resume-btn" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-300">
            Analyze My Resume
          </button>
          <button id="ats-check-btn" class="w-full bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-2 px-4 rounded-md transition duration-300">
            ATS Compatibility Check
          </button>
        </div>
        
        <div id="analyzer-result" class="mt-6 p-4 bg-gray-50 rounded-md hidden">
          <h3 class="text-lg font-semibold text-gray-800 mb-3">Resume Analysis</h3>
          <div id="analyzer-content" class="prose max-w-none">
            <!-- Analysis results will appear here -->
          </div>
        </div>
        
        <div id="ats-result" class="mt-6 p-4 bg-gray-50 rounded-md hidden">
          <h3 class="text-lg font-semibold text-gray-800 mb-3">ATS Compatibility Check</h3>
          <div id="ats-content" class="prose max-w-none">
            <!-- ATS check results will appear here -->
          </div>
        </div>
      </div>
    </div>
    
    <!-- Resume Suggestions -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Resume Suggestions</h2>
      <p class="text-gray-600 mb-6">Get personalized suggestions to tailor your resume for specific job opportunities</p>
      
      <div class="mb-6">
        <label for="job-description" class="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
        <textarea id="job-description" rows="6" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Paste the job description here..."></textarea>
      </div>
      
      <button id="get-suggestions-btn" class="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md transition duration-300">
        Get Suggestions
      </button>
      
      <div id="suggestions-result" class="mt-6 p-4 bg-gray-50 rounded-md hidden">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">Suggestions</h3>
        <div id="suggestions-content" class="prose max-w-none">
          <!-- Suggestions will appear here -->
        </div>
      </div>
    </div>
    
    <!-- Resume Job Match -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Resume-Job Match</h2>
      <p class="text-gray-600 mb-6">Compare your resume with a job description to see how well they match</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label for="resume-text" class="block text-sm font-medium text-gray-700 mb-2">Your Resume</label>
          <textarea id="resume-text" rows="8" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Paste your resume text here..."></textarea>
        </div>
        <div>
          <label for="job-description-match" class="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
          <textarea id="job-description-match" rows="8" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Paste the job description here..."></textarea>
        </div>
      </div>
      
      <button id="compare-btn" class="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md transition duration-300">
        Compare Match
      </button>
      
      <div id="comparison-result" class="mt-6 p-4 bg-gray-50 rounded-md hidden">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">Match Analysis</h3>
        <div id="comparison-content" class="prose max-w-none">
          <!-- Comparison results will appear here -->
        </div>
      </div>
    </div>
  `;
}