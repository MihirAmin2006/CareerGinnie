// Career Match Page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initCareerMatch();
    
    // Setup event listeners
    setupEventListeners();
    
    // Handle logout
    setupLogout();
    
    // Dark mode toggle
    setupDarkMode();
});

function initCareerMatch() {
    // Get container elements
    const mainContent = document.querySelector('.flex-1');
    const sidebarContainer = document.querySelector('.flex.min-h-screen');
    
    // Insert sidebar before main content
    if (sidebarContainer) {
        // First, check if sidebar already exists to avoid duplicates
        if (!document.querySelector('.bg-indigo-800.text-white')) {
            // Insert sidebar at the beginning of the container
            sidebarContainer.insertAdjacentHTML('afterbegin', renderSidebar());
            sidebarContainer.insertAdjacentHTML('afterbegin', renderMobileMenu());
        }
    }
    
    // Add margin to main content to account for fixed sidebar
    if (mainContent) {
        mainContent.classList.add('md:ml-64');
        
        // Make sure we have a container for our content
        if (!mainContent.querySelector('.container')) {
            mainContent.innerHTML = '<div class="container mx-auto px-4 py-6"></div>';
        }
        
        const contentContainer = mainContent.querySelector('.container');
        
        let careerMatchContent = `
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-3xl font-bold text-gray-800">Career Match</h1>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-xl font-bold text-gray-800 mb-4">Your Career Matches</h2>
                <p class="text-gray-600 mb-4">Based on your skills and preferences, we've identified these career paths that might be a good fit for you.</p>
                
                <div id="career-matches-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${renderCareerMatches()}
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-xl font-bold text-gray-800 mb-4">Career Exploration</h2>
                <p class="text-gray-600 mb-4">Explore other career paths that might interest you.</p>
                
                <div class="mb-4">
                    <label for="career-search" class="block text-sm font-medium text-gray-700 mb-1">Search Careers</label>
                    <input type="text" id="career-search" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Search by title, skill, or industry">
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label for="industry-filter" class="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                        <select id="industry-filter" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="">All Industries</option>
                            <option value="tech">Technology</option>
                            <option value="finance">Finance</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="education">Education</option>
                        </select>
                    </div>
                    <div>
                        <label for="experience-filter" class="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                        <select id="experience-filter" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="">All Levels</option>
                            <option value="entry">Entry Level</option>
                            <option value="mid">Mid Level</option>
                            <option value="senior">Senior Level</option>
                        </select>
                    </div>
                    <div>
                        <label for="salary-filter" class="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                        <select id="salary-filter" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="">All Ranges</option>
                            <option value="0-50000">$0 - $50,000</option>
                            <option value="50000-100000">$50,000 - $100,000</option>
                            <option value="100000-150000">$100,000 - $150,000</option>
                            <option value="150000+">$150,000+</option>
                        </select>
                    </div>
                </div>
                
                <button class="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded">
                    Search
                </button>
            </div>
        `;
        
        contentContainer.innerHTML = careerMatchContent;
    }
}

function renderCareerMatches() {
    const careers = [
        {
            title: "Software Developer",
            matchScore: 95,
            salary: "$105,000",
            growth: "+22%",
            skills: ["JavaScript", "React", "Node.js"],
            description: "Design, build, and maintain software applications and systems."
        },
        {
            title: "Data Scientist",
            matchScore: 87,
            salary: "$120,000",
            growth: "+31%",
            skills: ["Python", "Statistics", "Machine Learning"],
            description: "Analyze and interpret complex data to help guide business decisions."
        },
        {
            title: "UX/UI Designer",
            matchScore: 82,
            salary: "$95,000",
            growth: "+18%",
            skills: ["Design", "User Research", "Prototyping"],
            description: "Create intuitive, accessible interfaces for digital products."
        }
    ];
    
    let html = '';
    
    careers.forEach(career => {
        // Determine match score color
        let matchScoreColor = 'text-yellow-600';
        if (career.matchScore >= 90) {
            matchScoreColor = 'text-green-600';
        } else if (career.matchScore >= 80) {
            matchScoreColor = 'text-blue-600';
        }
        
        html += `
            <div class="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-lg font-medium text-gray-800">${career.title}</h3>
                    <span class="${matchScoreColor} font-bold">${career.matchScore}% Match</span>
                </div>
                <p class="text-sm text-gray-600 mb-4">${career.description}</p>
                
                <div class="flex justify-between mb-4">
                    <div>
                        <div class="text-xs text-gray-500">Avg. Salary</div>
                        <div class="font-medium">${career.salary}</div>
                    </div>
                    <div>
                        <div class="text-xs text-gray-500">Growth</div>
                        <div class="font-medium text-green-600">${career.growth}</div>
                    </div>
                </div>
                
                <div class="mb-4">
                    <div class="text-xs text-gray-500 mb-1">Key Skills</div>
                    <div class="flex flex-wrap gap-1">
                        ${career.skills.map(skill => `
                            <span class="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">${skill}</span>
                        `).join('')}
                    </div>
                </div>
                
                <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded text-sm">
                    View Career Details
                </button>
            </div>
        `;
    });
    
    return html;
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