document.addEventListener("DOMContentLoaded", function () {
  // Initialize sidebar
  initResumeAssistant();

  // Setup event listeners
  setupEventListeners();

  // Handle logout
  setupLogout();
  
  // Setup dark mode
  setupDarkMode();
  
  // Setup resume suggestion functionality
  setupResumeSuggestions();
});

function initResumeAssistant() {
  const mainContent = document.querySelector(".flex-1");
  const sidebarContainer = document.querySelector(".flex.min-h-screen");

  // Insert sidebar before main content if it doesn't exist
  if (
    sidebarContainer &&
    !document.querySelector(".bg-primary.text-white")
  ) {
    sidebarContainer.insertAdjacentHTML("afterbegin", renderSidebar());
    sidebarContainer.insertAdjacentHTML("afterbegin", renderMobileMenu());
  }

  // Add resume assistant content
  if (mainContent) {
    mainContent.innerHTML = `
      <div class="container mx-auto px-4 py-6">
        ${renderResumeAssistant()}
      </div>
    `;
  }
}

function setupEventListeners() {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
  
  // Add event listeners for resume buttons
  const editResumeBtn = document.querySelector('button#edit-resume-btn');
  if (editResumeBtn) {
    editResumeBtn.addEventListener('click', () => {
      // Open resume editor
      console.log('Opening resume editor...');
    });
  }
  
  const createResumeBtn = document.querySelector('button#create-resume-btn');
  if (createResumeBtn) {
    createResumeBtn.addEventListener('click', () => {
      // Create new resume
      console.log('Creating new resume...');
    });
  }
  
  // Enhanced resume analysis functionality
  const analyzeResumeBtn = document.querySelector('button#analyze-resume-btn');
  if (analyzeResumeBtn) {
    analyzeResumeBtn.addEventListener('click', async () => {
      // Get resume text from textarea
      const resumeText = document.querySelector('#resume-text-analyzer')?.value.trim();
      const resumeUpload = document.querySelector('#resume-upload');
      
      let finalResumeText = resumeText;
      
      // If textarea is empty but file is uploaded, try to extract text from file
      if (!resumeText && resumeUpload && resumeUpload.files.length > 0) {
        try {
          finalResumeText = await extractTextFromFile(resumeUpload.files[0]);
        } catch (error) {
          console.error('Error extracting text from file:', error);
          alert('Could not read the uploaded file. Please try pasting the text directly.');
          return;
        }
      }
      
      if (!finalResumeText) {
        alert('Please upload a resume file or paste your resume text.');
        return;
      }
      
      // Show loading state
      analyzeResumeBtn.disabled = true;
      analyzeResumeBtn.textContent = 'Analyzing...';
      
      try {
        // Analyze resume using mock function for now
        const analysis = await analyzeResume(finalResumeText);
        
        // Display analysis results
        const analyzerResult = document.getElementById('analyzer-result');
        const analyzerContent = document.getElementById('analyzer-content');
        
        if (analyzerContent && analyzerResult) {
          // Convert markdown to HTML (simple version)
          analyzerContent.innerHTML = markdownToHtml(analysis);
          analyzerResult.classList.remove('hidden');
          
          // Hide ATS result if it was previously shown
          const atsResult = document.getElementById('ats-result');
          if (atsResult) {
            atsResult.classList.add('hidden');
          }
          
          // Scroll to results
          analyzerResult.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (error) {
        console.error('Error analyzing resume:', error);
        alert('An error occurred while analyzing your resume. Please try again.');
      } finally {
        // Reset button state
        analyzeResumeBtn.disabled = false;
        analyzeResumeBtn.textContent = 'Analyze My Resume';
      }
    });
  }
  
  const atsCheckBtn = document.querySelector('button#ats-check-btn');
  if (atsCheckBtn) {
    atsCheckBtn.addEventListener('click', async () => {
      // Get resume text from textarea
      const resumeText = document.querySelector('#resume-text-analyzer')?.value.trim();
      const resumeUpload = document.querySelector('#resume-upload');
      
      let finalResumeText = resumeText;
      
      // If textarea is empty but file is uploaded, try to extract text from file
      if (!resumeText && resumeUpload && resumeUpload.files.length > 0) {
        try {
          finalResumeText = await extractTextFromFile(resumeUpload.files[0]);
        } catch (error) {
          console.error('Error extracting text from file:', error);
          alert('Could not read the uploaded file. Please try pasting the text directly.');
          return;
        }
      }
      
      if (!finalResumeText) {
        alert('Please upload a resume file or paste your resume text.');
        return;
      }
      
      // Show loading state
      atsCheckBtn.disabled = true;
      atsCheckBtn.textContent = 'Checking...';
      
      try {
        // Check ATS compatibility using mock function for now
        const atsAnalysis = await checkATSCompatibility(finalResumeText);
        
        // Display ATS analysis results
        const atsResult = document.getElementById('ats-result');
        const atsContent = document.getElementById('ats-content');
        
        if (atsContent && atsResult) {
          // Convert markdown to HTML (simple version)
          atsContent.innerHTML = markdownToHtml(atsAnalysis);
          atsResult.classList.remove('hidden');
          
          // Hide regular analysis result if it was previously shown
          const analyzerResult = document.getElementById('analyzer-result');
          if (analyzerResult) {
            analyzerResult.classList.add('hidden');
          }
          
          // Scroll to results
          atsResult.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (error) {
        console.error('Error checking ATS compatibility:', error);
        alert('An error occurred while checking ATS compatibility. Please try again.');
      } finally {
        // Reset button state
        atsCheckBtn.disabled = false;
        atsCheckBtn.textContent = 'ATS Compatibility Check';
      }
    });
  }
}

// Helper function to extract text from uploaded file
async function extractTextFromFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(event) {
      // For now, we'll just return the raw text
      // In a real implementation, you'd want to parse different file types appropriately
      resolve(event.target.result);
    };
    
    reader.onerror = function() {
      reject(new Error('Failed to read file'));
    };
    
    // Read as text for now (works for .txt files)
    // For PDFs and DOCs, you'd need more sophisticated parsing
    reader.readAsText(file);
  });
}

// Mock function for resume analysis (replace with actual API call later)
async function analyzeResume(resumeText) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return `
# Resume Analysis

## Strengths
- **Clear Structure**: Your resume has a well-organized structure.
- **Quantifiable Achievements**: Good use of metrics to demonstrate impact.
- **Relevant Skills**: Your technical skills are clearly highlighted.

## Areas for Improvement
- **Summary Statement**: Consider adding a more compelling professional summary.
- **Action Verbs**: Use more powerful action verbs to describe your accomplishments.
- **Consistency**: Ensure consistent formatting throughout the document.

## Recommendations
1. **Add a Skills Section**: Create a dedicated skills section to highlight your technical and soft skills.
2. **Quantify More Achievements**: Try to include numbers and percentages for more of your accomplishments.
3. **Tailor for ATS**: Use industry-standard keywords that will be recognized by Applicant Tracking Systems.
4. **Reduce Wordiness**: Some bullet points could be more concise and impactful.

## Overall Score: 7.5/10
Your resume is strong but has room for improvement in a few key areas.
`;
}

// Mock function for ATS compatibility check (replace with actual API call later)
async function checkATSCompatibility(resumeText) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return `
# ATS Compatibility Check

## Overall Compatibility Score: 82%

## What's Working Well
- **Standard Section Headers**: Your section titles are easily recognized by ATS systems.
- **Clean Formatting**: No complex tables or graphics that could confuse ATS.
- **Proper File Format**: Your resume uses a compatible format.

## Potential Issues
- **Complex Fonts**: Some fonts may not be properly parsed by all ATS systems.
- **Headers/Footers**: Information in headers/footers might be missed by some systems.
- **Lack of Keywords**: Your resume could include more industry-specific keywords.

## Missing Keywords
Based on common job descriptions in your field, consider adding these keywords:
- Project Management
- Agile Methodology
- Data Analysis
- Cross-functional Collaboration
- Strategic Planning

## Recommendations
1. **Use Simple Formatting**: Stick to standard bullets, fonts, and section headers.
2. **Add More Keywords**: Incorporate relevant industry terms throughout your resume.
3. **Avoid Headers/Footers**: Place all important information in the main body.
4. **Use Standard File Formats**: Save as .docx or .pdf for best compatibility.
5. **Test Your Resume**: Consider running it through multiple ATS checkers.
`;
}

// Simple markdown to HTML converter
function markdownToHtml(markdown) {
  if (!markdown) return '';
  
  // Replace headers
  let html = markdown
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-3 mt-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mb-2 mt-3">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mb-2 mt-3">$1</h3>')
    
    // Replace bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    
    // Replace lists
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-5 list-decimal mb-1">$1</li>')
    .replace(/^- (.*$)/gm, '<li class="ml-5 list-disc mb-1">$1</li>')
    
    // Replace paragraphs
    .replace(/^(?!<h|<li|<ul|<ol|<p|<\/)(.*$)/gm, '<p class="mb-2">$1</p>')
    
    // Replace line breaks
    .replace(/\n\n/g, '<br>');
  
  return html;
}

function setupResumeSuggestions() {
  // Import the LLAMA service
  import('/js/services/llamaService.js')
    .then(module => {
      const { generateResumeSuggestions, compareResumeWithJob } = module;
      
      // Get suggestions button
      const getSuggestionsBtn = document.getElementById('get-suggestions-btn');
      if (getSuggestionsBtn) {
        getSuggestionsBtn.addEventListener('click', async () => {
          const jobDescription = document.getElementById('job-description').value.trim();
          
          if (!jobDescription) {
            alert('Please enter a job description to get suggestions.');
            return;
          }
          
          // Show loading state
          getSuggestionsBtn.disabled = true;
          getSuggestionsBtn.textContent = 'Getting suggestions...';
          
          try {
            // Get user profile from localStorage or create a default one
            const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {
              fullName: 'Your Name',
              title: 'Your Professional Title',
              skills: ['Skill 1', 'Skill 2', 'Skill 3'],
              experience: 'Your experience details',
              education: 'Your education details',
              achievements: 'Your achievements'
            };
            
            // Get suggestions from LLAMA API
            const suggestions = await generateResumeSuggestions(userProfile, jobDescription);
            
            // Display suggestions
            const suggestionsResult = document.getElementById('suggestions-result');
            const suggestionsContent = document.getElementById('suggestions-content');
            
            suggestionsContent.innerHTML = suggestions.replace(/\n/g, '<br>');
            suggestionsResult.classList.remove('hidden');
            
            // Scroll to results
            suggestionsResult.scrollIntoView({ behavior: 'smooth' });
          } catch (error) {
            console.error('Error getting suggestions:', error);
            alert('An error occurred while getting suggestions. Please try again.');
          } finally {
            // Reset button state
            getSuggestionsBtn.disabled = false;
            getSuggestionsBtn.textContent = 'Get Suggestions';
          }
        });
      }
      
      // Compare resume with job description
      const compareBtn = document.getElementById('compare-btn');
      if (compareBtn) {
        compareBtn.addEventListener('click', async () => {
          const resumeText = document.getElementById('resume-text').value.trim();
          const jobDescription = document.getElementById('job-description-match').value.trim();
          
          if (!resumeText || !jobDescription) {
            alert('Please enter both your resume and the job description to compare.');
            return;
          }
          
          // Show loading state
          compareBtn.disabled = true;
          compareBtn.textContent = 'Comparing...';
          
          try {
            // Get comparison from LLAMA API
            const comparison = await compareResumeWithJob(resumeText, jobDescription);
            
            // Display comparison results
            const comparisonResult = document.getElementById('comparison-result');
            const comparisonContent = document.getElementById('comparison-content');
            
            comparisonContent.innerHTML = comparison.replace(/\n/g, '<br>');
            comparisonResult.classList.remove('hidden');
            
            // Scroll to results
            comparisonResult.scrollIntoView({ behavior: 'smooth' });
          } catch (error) {
            console.error('Error comparing resume with job:', error);
            alert('An error occurred while comparing. Please try again.');
          } finally {
            // Reset button state
            compareBtn.disabled = false;
            compareBtn.textContent = 'Compare Match';
          }
        });
      }
    })
    .catch(error => {
      console.error('Error importing LLAMA service:', error);
    });
}

function setupLogout() {
  // Look for any elements with logout or sign out text
  document.querySelectorAll('a, button').forEach(element => {
    const text = element.textContent.toLowerCase().trim();
    if (text === 'logout' || text === 'sign out' || text === 'log out') {
      element.addEventListener('click', handleLogout);
    }
  });
}

function handleLogout(e) {
  if (e) e.preventDefault();
  
  // Use the global firebase auth object
  if (typeof firebase !== 'undefined') {
    firebase.auth().signOut()
      .then(() => {
        // Redirect to index page
        window.location.href = '/index.html';
      })
      .catch(error => {
        console.error('Error signing out:', error);
        // Still redirect even if there's an error
        window.location.href = '/index.html';
      });
  } else {
    window.location.href = '/index.html';
  }
}

function setupDarkMode() {
  const darkModeToggle = document.getElementById("theme-toggle-sidebar");
  
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Refresh sidebar to update theme toggle button
      refreshSidebar();
    });
  }
}

function refreshSidebar() {
  const sidebarContainer = document.querySelector('.flex.min-h-screen');
  if (sidebarContainer) {
    // Remove old sidebar
    const oldSidebar = sidebarContainer.querySelector('aside');
    if (oldSidebar) {
      oldSidebar.remove();
    }
    
    // Remove old mobile menu
    const oldMobileMenu = document.querySelector('.md\\:hidden');
    if (oldMobileMenu) {
      oldMobileMenu.remove();
    }
    const oldMobileMenuContent = document.getElementById('mobile-menu');
    if (oldMobileMenuContent) {
      oldMobileMenuContent.remove();
    }
    
    // Insert updated components
    sidebarContainer.insertAdjacentHTML('afterbegin', renderSidebar());
    sidebarContainer.insertAdjacentHTML('afterbegin', renderMobileMenu());
  }
}