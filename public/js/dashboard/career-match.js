// Career Match Page
document.addEventListener("DOMContentLoaded", async function () {
  // Initialize components
  await initCareerMatch();

  // Setup event listeners
  setupEventListeners();

  // Handle logout
  setupLogout();

  // Dark mode toggle
  setupDarkMode();
});

// Make initCareerMatch async
async function initCareerMatch() {
  // Get container elements
  const mainContent = document.querySelector(".flex-1");
  const sidebarContainer = document.querySelector(".flex.min-h-screen");

  // Insert sidebar before main content
  if (sidebarContainer) {
    // First, check if sidebar already exists to avoid duplicates
    if (!document.querySelector(".bg-indigo-800.text-white")) {
      // Insert sidebar at the beginning of the container
      sidebarContainer.insertAdjacentHTML("afterbegin", renderSidebar());
      sidebarContainer.insertAdjacentHTML("afterbegin", renderMobileMenu());
    }
  }

  // Add margin to main content to account for fixed sidebar
  if (mainContent) {
    mainContent.classList.add("md:ml-64");

    if (!mainContent.querySelector(".container")) {
      mainContent.innerHTML = '<div class="container mx-auto px-4 py-6"></div>';
    }

    const contentContainer = mainContent.querySelector(".container");

    // Add loading state
    contentContainer.innerHTML =
      '<div class="text-center py-4">Loading career matches...</div>';

    // Get the career matches HTML
    const careerMatchesHtml = await renderCareerMatches();

    // Define the content structure
    const careerMatchContent = `
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800">Career Match</h1>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Your Career Matches</h2>
            <p class="text-gray-600 mb-4">Based on your skills and preferences, we've identified these career paths that might be a good fit for you.</p>
            
            <div id="career-matches-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${careerMatchesHtml}
            </div>
        </div>
        
        
    `;

    contentContainer.innerHTML = careerMatchContent;
  }
}
// End of initCareerMatch function

// Update renderCareerMatches to handle API response properly
async function renderCareerMatches() {
  try {
    // Get user profile from localStorage
    const userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};

    // Log the user profile for debugging
    console.log("User Profile:", userProfile);

    if (
      !userProfile.occupation &&
      (!userProfile.skills || userProfile.skills.length === 0)
    ) {
      return '<p class="text-gray-600">Please complete your profile with occupation and skills to see job matches.</p>';
    }

    // Construct search query based on user profile
    const searchQuery = `${userProfile.occupation || ""} ${
      userProfile.skills?.join(" ") || ""
    }`.trim();
    console.log("Search Query:", searchQuery);

    // API configuration
    const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
      searchQuery
    )}&page=1&num_pages=1&country=us`;
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "X-RapidAPI-Key": "13dac02fccmshe90969e3d7b001bp138ac7jsnaa2509384b90",
    //     "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    //   },
    // };
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'a05ae14800msh8c856416dcad393p133d2bjsn36bb40bc820e',
        'x-rapidapi-host': 'jsearch.p.rapidapi.com'
      },
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("API Response:", result);

    const jobs = result.data || [];

    if (jobs.length === 0) {
      return '<p class="text-gray-600">No matching jobs found. Try adjusting your search criteria.</p>';
    }

    let html = "";

    jobs.forEach((job) => {
      // Calculate a mock match score based on skills match
      const matchScore = calculateMatchScore(job, userProfile);

      // Determine match score color
      let matchScoreColor = "text-yellow-600";
      if (matchScore >= 90) {
        matchScoreColor = "text-green-600";
      } else if (matchScore >= 80) {
        matchScoreColor = "text-blue-600";
      }

      html += `
                <div class="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div class="flex justify-between items-start mb-3">
                        <h3 class="text-lg font-medium text-gray-800">${
                          job.job_title
                        }</h3>
                        <span class="${matchScoreColor} font-bold">${matchScore}% Match</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-4">${job.job_description?.substring(
                      0,
                      150
                    )}...</p>
                    
                    <div class="flex justify-between mb-4">
                        <div>
                            <div class="text-xs text-gray-500">Salary Range</div>
                            <div class="font-medium">${
                              job.job_min_salary
                                ? `$${job.job_min_salary} - $${job.job_max_salary}`
                                : "Not specified"
                            }</div>
                        </div>
                        <div>
                            <div class="text-xs text-gray-500">Company</div>
                            <div class="font-medium text-gray-800">${
                              job.employer_name
                            }</div>
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <div class="text-xs text-gray-500 mb-1">Required Skills</div>
                        <div class="flex flex-wrap gap-1">
                            ${(job.job_required_skills || [])
                              .map(
                                (skill) => `
                                <span class="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">${skill}</span>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                    
                    <a href="${job.job_apply_link}" target="_blank" 
                       class="block w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded text-sm text-center">
                        Apply Now
                    </a>
                </div>
            `;
    });

    return (
      html ||
      '<p class="text-gray-600">No matching jobs found. Try adjusting your search criteria.</p>'
    );
  } catch (error) {
    console.error("Error fetching job matches:", error);
    return '<p class="text-red-600">Error loading job matches. Please try again later.</p>';
  }
}

function calculateMatchScore(job, userProfile) {
  let score = 70; // Base score

  // Match skills
  const jobSkills = (job.job_required_skills || []).map((skill) =>
    skill.toLowerCase()
  );
  const userSkills = (userProfile.skills || []).map((skill) =>
    skill.toLowerCase()
  );

  const matchingSkills = userSkills.filter((skill) =>
    jobSkills.some((jobSkill) => jobSkill.includes(skill))
  );

  // Add points for matching skills
  score += (matchingSkills.length / userSkills.length) * 20;

  // Match experience
  if (userProfile.experience) {
    const userExp = parseInt(userProfile.experience);
    const jobExp =
      job.job_required_experience?.required_experience_in_months || 0;

    if (userExp * 12 >= jobExp) {
      score += 10;
    }
  }

  return Math.min(Math.round(score), 100);
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
}

function setupLogout() {
  // Look for any elements with logout or sign out text
  document.querySelectorAll("a, button").forEach((element) => {
    const text = element.textContent.toLowerCase().trim();
    if (text === "logout" || text === "sign out" || text === "log out") {
      element.addEventListener("click", handleLogout);
    }
  });
}

function handleLogout(e) {
  if (e) e.preventDefault();

  // Use the global firebase auth object
  if (typeof firebase !== "undefined") {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Redirect to index page
        window.location.href = "/index.html";
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        // Still redirect even if there's an error
        window.location.href = "/index.html";
      });
  } else {
    window.location.href = "/index.html";
  }
}

/* Commenting out the setupDarkMode function
function setupDarkMode() {
  const darkModeToggle = document.getElementById("theme-toggle-sidebar");

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      // Refresh sidebar to update theme toggle button
      refreshSidebar();
    });
  }
}
*/

function refreshSidebar() {
  const sidebarContainer = document.querySelector(".flex.min-h-screen");
  if (sidebarContainer) {
    // Remove old sidebar
    const oldSidebar = sidebarContainer.querySelector("aside");
    if (oldSidebar) {
      oldSidebar.remove();
    }

    // Remove old mobile menu
    const oldMobileMenu = document.querySelector(".md\\:hidden");
    if (oldMobileMenu) {
      oldMobileMenu.remove();
    }
    const oldMobileMenuContent = document.getElementById("mobile-menu");
    if (oldMobileMenuContent) {
      oldMobileMenuContent.remove();
    }

    // Insert updated components
    sidebarContainer.insertAdjacentHTML("afterbegin", renderSidebar());
    sidebarContainer.insertAdjacentHTML("afterbegin", renderMobileMenu());
  }
}
