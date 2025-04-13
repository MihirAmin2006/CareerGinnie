// Main Dashboard Script
document.addEventListener("DOMContentLoaded", async function () {
  // Initialize components
  await initDashboard();

  // Setup event listeners
  setupEventListeners();

  // Initialize charts
  initCharts();

  // Handle logout
  setupLogout();

  // Fetch user data
  fetchUserData();

  // Dark mode toggle
  setupDarkMode();
});

// In the initDashboard function, after the user authentication
async function initDashboard() {
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

    // Show loading state first
    contentContainer.innerHTML = `
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
            </div>
            ${renderUserOverview()}
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                ${renderSkillsAssessment()}
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="animate-pulse flex space-x-4">
                        <div class="flex-1 space-y-4 py-1">
                            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div class="space-y-2">
                                <div class="h-4 bg-gray-200 rounded"></div>
                                <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ${renderJobMarket()}
        `;

    // Then load the career paths
    try {
      // Clear any cached job data
      sessionStorage.removeItem("jobListings");

      const careerPathsHTML = await renderCareerPaths();
      const gridContainer = contentContainer.querySelector(".grid");
      if (gridContainer) {
        const careerPathsContainer = gridContainer.children[1];
        careerPathsContainer.outerHTML = careerPathsHTML;
      }
    } catch (error) {
      console.error("Failed to load career paths:", error);
    }
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

  // Notification dropdown toggle
  const notificationBtn = document.getElementById("notification-btn");
  const notificationDropdown = document.getElementById("notification-dropdown");

  if (notificationBtn && notificationDropdown) {
    notificationBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      notificationDropdown.classList.toggle("hidden");
    });

    // Close notification dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (
        notificationDropdown.contains(e.target) &&
        e.target !== notificationBtn
      ) {
        notificationDropdown.classList.add("hidden");
      }
    });
  }
}

function initCharts() {
  // Initialize salary trends chart
  if (document.getElementById("salary-trends-container")) {
    document.getElementById("salary-trends-container").innerHTML =
      renderSalaryTrends();
    initSalaryTrendsChart();
  }
}

function setupLogout() {
  console.log("Setting up logout handlers");

  // Direct selector for logout buttons in the sidebar
  const logoutButtons = document.querySelectorAll(
    'button[onclick="signOut()"]'
  );
  if (logoutButtons.length > 0) {
    logoutButtons.forEach((button) => {
      // Remove the onclick attribute and use addEventListener instead
      button.removeAttribute("onclick");
      button.addEventListener("click", handleLogout);
      console.log("Found logout button with onclick attribute");
    });
  }

  // Look for any elements with logout or sign out text
  document.querySelectorAll("a, button").forEach((element) => {
    const text = element.textContent.toLowerCase().trim();
    if (text === "logout" || text === "sign out" || text === "log out") {
      element.addEventListener("click", handleLogout);
      console.log("Found logout element by text:", element);
    }
  });

  // Add a global document click handler as a fallback
  document.addEventListener("click", function (e) {
    const target = e.target.closest("a, button");
    if (
      target &&
      (target.textContent.toLowerCase().includes("logout") ||
        target.textContent.toLowerCase().includes("sign out"))
    ) {
      console.log("Caught logout click via global handler");
      handleLogout(e);
    }
  });
}

// Simplified logout handler that works with Firebase compat version
function handleLogout(e) {
  if (e) e.preventDefault();
  console.log("Logout handler triggered");

  // Use the global firebase auth object
  if (typeof firebase !== "undefined") {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Successfully logged out");
        // Redirect to index page
        window.location.href = "/index.html";
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        // Still redirect even if there's an error
        window.location.href = "/index.html";
      });
  } else {
    console.warn("Firebase not available, redirecting without logout");
    window.location.href = "/index.html";
  }
}

function setupDarkMode() {
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      // Save preference to localStorage
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
      } else {
        localStorage.setItem("darkMode", "disabled");
      }
    });

    // Check for saved dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark-mode");
    }
  }
}

async function fetchUserData() {
  // Get the current user from Firebase
  const currentUser = firebase.auth().currentUser;

  if (currentUser) {
    const userData = {
      name: currentUser.displayName || "User",
      initials: getInitials(currentUser.displayName || "User"),
      skillScore: "--",
      careerMatches: 4,
      profileCompletion: 85,
      skills: [
        { name: "JavaScript", level: 4 },
        { name: "React", level: 3 },
        { name: "Node.js", level: 3 },
        { name: "Python", level: 2 },
      ],
      goals: [
        { name: "Complete 2 Skill Quizzes", progress: 1, total: 2, dueIn: 3 },
        { name: "Watch 3 Tutorial Videos", progress: 2, total: 3, dueIn: 5 },
        { name: "Update Resume", progress: 0, total: 1, dueIn: 7 },
      ],
      notifications: [
        {
          type: "assessment",
          title: "New Python Assessment Available",
          description:
            "Take the new Python Data Science assessment to improve your skill rating.",
          time: "2 hours ago",
        },
        {
          type: "job",
          title: "Job Trend Alert",
          description: "15% increase in Full Stack Developer jobs.",
          time: "Yesterday",
        },
        {
          type: "course",
          title: "New Course Recommendation",
          description: 'We recommend "Advanced JavaScript Patterns" course.',
          time: "3 days ago",
        },
      ],
    };

    // Update UI with actual user data
    updateUserInterface(userData);
  }
}

// Helper function to get initials
function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function updateUserInterface(userData) {
  // Update user overview
  const userNameElement = document.getElementById("user-name");
  const userInitialsElement = document.getElementById("user-initials");
  const skillScoreElement = document.getElementById("skill-score");

  if (userNameElement) userNameElement.textContent = userData.name;
  if (userInitialsElement) userInitialsElement.textContent = userData.initials;
  if (skillScoreElement) skillScoreElement.textContent = userData.skillScore;

  // Update goals
  updateGoals(userData.goals);

  // Update notifications
  updateNotifications(userData.notifications);
}

function updateGoals(goals) {
  const goalContainer = document.querySelector(".weekly-goal-container");
  if (!goalContainer) return;

  let goalsHTML = "";

  goals.forEach((goal) => {
    const progressPercent = (goal.progress / goal.total) * 100;
    const statusClass =
      progressPercent === 0
        ? "bg-yellow-100 text-yellow-800"
        : "bg-green-100 text-green-800";
    const statusText =
      progressPercent === 0 ? "Not Started" : `${goal.progress}/${goal.total}`;

    goalsHTML += `
            <div class="border rounded-lg p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-md font-medium text-gray-800">${
                      goal.name
                    }</h3>
                    <span class="${statusClass} text-xs px-2 py-1 rounded">${statusText}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div class="${
                      progressPercent === 0 ? "bg-yellow-600" : "bg-green-600"
                    } h-2.5 rounded-full" style="width: ${progressPercent}%"></div>
                </div>
                <p class="text-xs text-gray-600">Due in ${goal.dueIn} days</p>
            </div>
        `;
  });

  goalContainer.innerHTML = goalsHTML;
}

function updateNotifications(notifications) {
  const notificationContainer = document.querySelector(
    ".notification-container"
  );
  if (!notificationContainer) return;

  let notificationsHTML = "";

  notifications.forEach((notification) => {
    let iconClass = "";
    let bgClass = "";

    switch (notification.type) {
      case "assessment":
        iconClass = "text-blue-600";
        bgClass = "bg-blue-100";
        break;
      case "job":
        iconClass = "text-green-600";
        bgClass = "bg-green-100";
        break;
      case "course":
        iconClass = "text-yellow-600";
        bgClass = "bg-yellow-100";
        break;
      default:
        iconClass = "text-gray-600";
        bgClass = "bg-gray-100";
    }

    notificationsHTML += `
            <div class="flex items-start p-3 bg-gray-50 rounded-lg mb-3">
                <div class="flex-shrink-0 ${bgClass} rounded-full p-2 mr-3">
                    <svg class="h-5 w-5 ${iconClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        ${getNotificationIcon(notification.type)}
                    </svg>
                </div>
                <div>
                    <h3 class="text-sm font-medium text-gray-800">${
                      notification.title
                    }</h3>
                    <p class="text-xs text-gray-600 mt-1">${
                      notification.description
                    }</p>
                    <div class="flex mt-2">
                        <button class="text-xs text-indigo-600 hover:text-indigo-800 font-medium mr-3">View Details</button>
                        <button class="text-xs text-gray-500 hover:text-gray-700">Dismiss</button>
                    </div>
                </div>
                <div class="ml-auto text-xs text-gray-500">${
                  notification.time
                }</div>
            </div>
        `;
  });

  notificationContainer.innerHTML = notificationsHTML;
}

function getNotificationIcon(type) {
  switch (type) {
    case "assessment":
      return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>';
    case "job":
      return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>';
    case "course":
      return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>';
    default:
      return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>';
  }
}

// Add window resize event for responsive charts
window.addEventListener("resize", function () {
  const salaryTrendsChart = document.getElementById("salary-trends-chart");
  if (salaryTrendsChart && typeof echarts !== "undefined") {
    const chart = echarts.getInstanceByDom(salaryTrendsChart);
    if (chart) {
      chart.resize();
    }
  }
});

// After the updateGoals function and before getNotificationIcon function

function renderNotifications() {
  return `
        <div class="bg-white rounded-lg shadow p-6 mt-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-800">Notifications</h2>
                <button class="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
            </div>
            <div class="space-y-3" id="notifications-list">
                <!-- Notifications will be populated here by updateNotifications() -->
                <div class="text-center text-gray-500 py-4">Loading notifications...</div>
            </div>
        </div>
    `;
}

// Also add these missing render functions that are used in initDashboard
function renderUserOverview() {
  return `
        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <div class="flex items-center">
                <div class="bg-indigo-100 text-indigo-800 rounded-full h-16 w-16 flex items-center justify-center text-xl font-bold mr-4" id="user-initials">--</div>
                <div>
                    <h2 class="text-xl font-bold text-gray-800" id="user-name">Welcome</h2>
                    <p class="text-gray-600">Complete your profile</p>
                </div>
                <div class="ml-auto text-right">
                    <div class="text-sm text-gray-600">Skill Score</div>
                    <div class="text-2xl font-bold text-indigo-600" id="skill-score">--</div>
                </div>
            </div>
        </div>
    `;
}

function renderSkillsAssessment() {
  return `
        <div class="bg-white rounded-lg shadow p-6 h-[200px] overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-800">Career Growth Tracker</h2>
                <button onclick="addNewAchievement()" class="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md">
                    Add Achievement
                </button>
            </div>
            
            <div id="achievements-list" class="space-y-4">
                <!-- Achievements will be loaded here -->
            </div>

            <!-- Achievement Form Modal -->
            <div id="achievement-modal" class="hidden fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                <div class="bg-white rounded-lg p-6 w-full max-w-md">
                    <h3 class="text-lg font-bold mb-4">Add New Achievement</h3>
                    <form id="achievement-form" onsubmit="saveAchievement(event)" class="space-y-6">
                        <div class="space-y-5">
                            <div>
                                <label class="block text-lg font-semibold text-gray-800 mb-2">Achievement Title</label>
                                <input type="text" id="achievement-title" required
                                    class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 
                                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                    placeholder-gray-400 transition duration-150 ease-in-out
                                    hover:border-indigo-300"
                                    placeholder="Enter achievement title">
                            </div>
                            <div>
                                <label class="block text-lg font-semibold text-gray-800 mb-2">Description</label>
                                <textarea id="achievement-description" rows="4" required
                                    class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300
                                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                    placeholder-gray-400 transition duration-150 ease-in-out
                                    hover:border-indigo-300 resize-none"
                                    placeholder="Describe your achievement"></textarea>
                            </div>
                            <div>
                                <label class="block text-lg font-semibold text-gray-800 mb-2">Achievement Date</label>
                                <input type="date" id="achievement-date" required
                                    class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300
                                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                    transition duration-150 ease-in-out
                                    hover:border-indigo-300">
                            </div>
                        </div>
                        <div class="mt-6 flex justify-end space-x-4">
                            <button type="button" onclick="closeAchievementModal()" 
                                class="px-6 py-3 text-base font-medium text-gray-700 bg-gray-100 
                                hover:bg-gray-200 rounded-lg transition duration-150 ease-in-out
                                focus:outline-none focus:ring-2 focus:ring-gray-400">
                                Cancel
                            </button>
                            <button type="submit" 
                                class="px-6 py-3 text-base font-medium text-white bg-indigo-600 
                                hover:bg-indigo-700 rounded-lg transition duration-150 ease-in-out
                                focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md
                                hover:shadow-lg">
                                Save Achievement
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

// Add these functions after renderSkillsAssessment
function addNewAchievement() {
  const modal = document.getElementById("achievement-modal");
  modal.classList.remove("hidden");
}

function closeAchievementModal() {
  const modal = document.getElementById("achievement-modal");
  modal.classList.add("hidden");
  document.getElementById("achievement-form").reset();
}

async function saveAchievement(event) {
  event.preventDefault();

  const userId = firebase.auth().currentUser.uid;
  const title = document.getElementById("achievement-title").value;
  const description = document.getElementById("achievement-description").value;
  const date = document.getElementById("achievement-date").value;

  try {
    await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("achievements")
      .add({
        title,
        description,
        date,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    closeAchievementModal();
    loadAchievements();
  } catch (error) {
    console.error("Error saving achievement:", error);
    alert("Failed to save achievement. Please try again.");
  }
}

async function loadAchievements() {
  const userId = firebase.auth().currentUser.uid;
  const achievementsList = document.getElementById("achievements-list");

  try {
    const snapshot = await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("achievements")
      .orderBy("date", "desc")
      .get();

    if (snapshot.empty) {
      achievementsList.innerHTML = `
                <div class="text-center text-gray-500 py-4">
                    No achievements added yet. Click "Add Achievement" to get started!
                </div>
            `;
      return;
    }

    achievementsList.innerHTML = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return `
                <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-start justify-between">
                        <div>
                            <h3 class="font-medium text-gray-900">${
                              data.title
                            }</h3>
                            <p class="text-sm text-gray-600 mt-1">${
                              data.description
                            }</p>
                            <p class="text-xs text-gray-500 mt-2">${new Date(
                              data.date
                            ).toLocaleDateString()}</p>
                        </div>
                        <button onclick="deleteAchievement('${doc.id}')" 
                            class="text-red-600 hover:text-red-800">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            `;
      })
      .join("");
  } catch (error) {
    console.error("Error loading achievements:", error);
    achievementsList.innerHTML = `
            <div class="text-center text-red-500 py-4">
                Error loading achievements. Please try again.
            </div>
        `;
  }
}

async function deleteAchievement(achievementId) {
  if (!confirm("Are you sure you want to delete this achievement?")) return;

  const userId = firebase.auth().currentUser.uid;
  try {
    await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("achievements")
      .doc(achievementId)
      .delete();

    loadAchievements();
  } catch (error) {
    console.error("Error deleting achievement:", error);
    alert("Failed to delete achievement. Please try again.");
  }
}

// Update the renderJobMarket function
function renderJobMarket() {
  return `
        <div class="bg-white rounded-lg shadow p-6 mt-6" style="display: none;">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-800">Job Market Insights</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4" id="job-market-stats">
                <div class="border rounded-lg p-4">
                    <h3 class="font-medium text-gray-800">Average Salary</h3>
                    <p class="text-2xl font-bold text-indigo-600 mt-2" id="avg-salary">Loading...</p>
                    <p class="text-sm text-gray-600 mt-1" id="salary-range">Calculating range...</p>
                </div>
                <div class="border rounded-lg p-4">
                    <h3 class="font-medium text-gray-800">Job Openings</h3>
                    <p class="text-2xl font-bold text-indigo-600 mt-2" id="job-count">Loading...</p>
                    <p class="text-sm text-gray-600 mt-1" id="job-trends">Analyzing trends...</p>
                </div>
                <div class="border rounded-lg p-4">
                    <h3 class="font-medium text-gray-800">Top Skills</h3>
                    <p class="text-2xl font-bold text-indigo-600 mt-2" id="top-skill">Loading...</p>
                    <p class="text-sm text-gray-600 mt-1" id="skill-demand">Analyzing demand...</p>
                </div>
            </div>
        </div>
    `;
}

// Add new function to update job market insights
async function refreshJobMarketData() {
  try {
    const jobs = await fetchJobs();
    updateJobMarketStats(jobs);
  } catch (error) {
    console.error("Error refreshing job market data:", error);
  }
}

// Add function to update job market statistics
function updateJobMarketStats(jobs) {
  if (!jobs || jobs.length === 0) return;

  // Calculate salary statistics
  const salaries = jobs
    .filter((job) => job.job_min_salary || job.job_max_salary)
    .map((job) => ({
      min: job.job_min_salary || job.job_max_salary,
      max: job.job_max_salary || job.job_min_salary,
    }));

  const avgSalary =
    salaries.reduce((acc, curr) => acc + (curr.min + curr.max) / 2, 0) /
    salaries.length;
  const minSalary = Math.min(...salaries.map((s) => s.min));
  const maxSalary = Math.max(...salaries.map((s) => s.max));

  // Analyze skills
  const skillsCount = {};
  const commonSkills = [
    "JavaScript",
    "Python",
    "Java",
    "React",
    "Node.js",
    "AWS",
    "SQL",
  ];

  jobs.forEach((job) => {
    const description = job.job_description?.toLowerCase() || "";
    commonSkills.forEach((skill) => {
      if (description.includes(skill.toLowerCase())) {
        skillsCount[skill] = (skillsCount[skill] || 0) + 1;
      }
    });
  });

  const topSkill = Object.entries(skillsCount).sort((a, b) => b[1] - a[1])[0];

  // Update the UI
  document.getElementById("avg-salary").textContent = `$${Math.round(
    avgSalary
  ).toLocaleString()}`;
  document.getElementById("salary-range").textContent = `Range: $${Math.round(
    minSalary
  ).toLocaleString()} - $${Math.round(maxSalary).toLocaleString()}`;

  document.getElementById("job-count").textContent = jobs.length;
  document.getElementById("job-trends").textContent = `${
    jobs.filter(
      (j) => j.job_posted_at_timestamp > Date.now() - 7 * 24 * 60 * 60 * 1000
    ).length
  } new this week`;

  document.getElementById("top-skill").textContent = topSkill[0];
  document.getElementById(
    "skill-demand"
  ).textContent = `Required in ${Math.round(
    (topSkill[1] / jobs.length) * 100
  )}% of jobs`;
}

// Update initDashboard to include job market insights
async function initDashboard() {
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

    // Show loading state first
    contentContainer.innerHTML = `
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
            </div>
            ${renderUserOverview()}
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                ${renderSkillsAssessment()}
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="animate-pulse flex space-x-4">
                        <div class="flex-1 space-y-4 py-1">
                            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div class="space-y-2">
                                <div class="h-4 bg-gray-200 rounded"></div>
                                <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ${renderJobMarket()}
        `;

    // Then load the career paths
    try {
      // Clear any cached job data
      sessionStorage.removeItem("jobListings");

      const careerPathsHTML = await renderCareerPaths();
      const gridContainer = contentContainer.querySelector(".grid");
      if (gridContainer) {
        const careerPathsContainer = gridContainer.children[1];
        careerPathsContainer.outerHTML = careerPathsHTML;
      }
    } catch (error) {
      console.error("Failed to load career paths:", error);
    }
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

  // Notification dropdown toggle
  const notificationBtn = document.getElementById("notification-btn");
  const notificationDropdown = document.getElementById("notification-dropdown");

  if (notificationBtn && notificationDropdown) {
    notificationBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      notificationDropdown.classList.toggle("hidden");
    });

    // Close notification dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (
        notificationDropdown.contains(e.target) &&
        e.target !== notificationBtn
      ) {
        notificationDropdown.classList.add("hidden");
      }
    });
  }
}

function initCharts() {
  // Initialize salary trends chart
  if (document.getElementById("salary-trends-container")) {
    document.getElementById("salary-trends-container").innerHTML =
      renderSalaryTrends();
    initSalaryTrendsChart();
  }
}

function setupLogout() {
  console.log("Setting up logout handlers");

  // Direct selector for logout buttons in the sidebar
  const logoutButtons = document.querySelectorAll(
    'button[onclick="signOut()"]'
  );
  if (logoutButtons.length > 0) {
    logoutButtons.forEach((button) => {
      // Remove the onclick attribute and use addEventListener instead
      button.removeAttribute("onclick");
      button.addEventListener("click", handleLogout);
      console.log("Found logout button with onclick attribute");
    });
  }

  // Look for any elements with logout or sign out text
  document.querySelectorAll("a, button").forEach((element) => {
    const text = element.textContent.toLowerCase().trim();
    if (text === "logout" || text === "sign out" || text === "log out") {
      element.addEventListener("click", handleLogout);
      console.log("Found logout element by text:", element);
    }
  });

  // Add a global document click handler as a fallback
  document.addEventListener("click", function (e) {
    const target = e.target.closest("a, button");
    if (
      target &&
      (target.textContent.toLowerCase().includes("logout") ||
        target.textContent.toLowerCase().includes("sign out"))
    ) {
      console.log("Caught logout click via global handler");
      handleLogout(e);
    }
  });
}

// Simplified logout handler that works with Firebase compat version
function handleLogout(e) {
  if (e) e.preventDefault();
  console.log("Logout handler triggered");

  // Use the global firebase auth object
  if (typeof firebase !== "undefined") {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Successfully logged out");
        // Redirect to index page
        window.location.href = "/index.html";
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        // Still redirect even if there's an error
        window.location.href = "/index.html";
      });
  } else {
    console.warn("Firebase not available, redirecting without logout");
    window.location.href = "/index.html";
  }
}

function setupDarkMode() {
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      // Save preference to localStorage
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
      } else {
        localStorage.setItem("darkMode", "disabled");
      }
    });

    // Check for saved dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark-mode");
    }
  }
}

async function fetchUserData() {
  // Get the current user from Firebase
  const currentUser = firebase.auth().currentUser;

  if (currentUser) {
    const userData = {
      name: currentUser.displayName || "User",
      initials: getInitials(currentUser.displayName || "User"),
      skillScore: "--",
      careerMatches: 4,
      profileCompletion: 85,
      skills: [
        { name: "JavaScript", level: 4 },
        { name: "React", level: 3 },
        { name: "Node.js", level: 3 },
        { name: "Python", level: 2 },
      ],
      goals: [
        { name: "Complete 2 Skill Quizzes", progress: 1, total: 2, dueIn: 3 },
        { name: "Watch 3 Tutorial Videos", progress: 2, total: 3, dueIn: 5 },
        { name: "Update Resume", progress: 0, total: 1, dueIn: 7 },
      ],
      notifications: [
        {
          type: "assessment",
          title: "New Python Assessment Available",
          description:
            "Take the new Python Data Science assessment to improve your skill rating.",
          time: "2 hours ago",
        },
        {
          type: "job",
          title: "Job Trend Alert",
          description: "15% increase in Full Stack Developer jobs.",
          time: "Yesterday",
        },
        {
          type: "course",
          title: "New Course Recommendation",
          description: 'We recommend "Advanced JavaScript Patterns" course.',
          time: "3 days ago",
        },
      ],
    };

    // Update UI with actual user data
    updateUserInterface(userData);
  }
}

// Helper function to get initials
function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function updateUserInterface(userData) {
  // Update user overview
  const userNameElement = document.getElementById("user-name");
  const userInitialsElement = document.getElementById("user-initials");
  const skillScoreElement = document.getElementById("skill-score");

  if (userNameElement) userNameElement.textContent = userData.name;
  if (userInitialsElement) userInitialsElement.textContent = userData.initials;
  if (skillScoreElement) skillScoreElement.textContent = userData.skillScore;

  // Update goals
  updateGoals(userData.goals);

  // Update notifications
  updateNotifications(userData.notifications);
}

function updateGoals(goals) {
  const goalContainer = document.querySelector(".weekly-goal-container");
  if (!goalContainer) return;

  let goalsHTML = "";

  goals.forEach((goal) => {
    const progressPercent = (goal.progress / goal.total) * 100;
    const statusClass =
      progressPercent === 0
        ? "bg-yellow-100 text-yellow-800"
        : "bg-green-100 text-green-800";
    const statusText =
      progressPercent === 0 ? "Not Started" : `${goal.progress}/${goal.total}`;

    goalsHTML += `
            <div class="border rounded-lg p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-md font-medium text-gray-800">${
                      goal.name
                    }</h3>
                    <span class="${statusClass} text-xs px-2 py-1 rounded">${statusText}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div class="${
                      progressPercent === 0 ? "bg-yellow-600" : "bg-green-600"
                    } h-2.5 rounded-full" style="width: ${progressPercent}%"></div>
                </div>
                <p class="text-xs text-gray-600">Due in ${goal.dueIn} days</p>
            </div>
        `;
  });

  goalContainer.innerHTML = goalsHTML;
}

function updateNotifications(notifications) {
  const notificationContainer = document.querySelector(
    ".notification-container"
  );
  if (!notificationContainer) return;

  let notificationsHTML = "";

  notifications.forEach((notification) => {
    let iconClass = "";
    let bgClass = "";

    switch (notification.type) {
      case "assessment":
        iconClass = "text-blue-600";
        bgClass = "bg-blue-100";
        break;
      case "job":
        iconClass = "text-green-600";
        bgClass = "bg-green-100";
        break;
      case "course":
        iconClass = "text-yellow-600";
        bgClass = "bg-yellow-100";
        break;
      default:
        iconClass = "text-gray-600";
        bgClass = "bg-gray-100";
    }

    notificationsHTML += `
            <div class="flex items-start p-3 bg-gray-50 rounded-lg mb-3">
                <div class="flex-shrink-0 ${bgClass} rounded-full p-2 mr-3">
                    <svg class="h-5 w-5 ${iconClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        ${getNotificationIcon(notification.type)}
                    </svg>
                </div>
                <div>
                    <h3 class="text-sm font-medium text-gray-800">${
                      notification.title
                    }</h3>
                    <p class="text-xs text-gray-600 mt-1">${
                      notification.description
                    }</p>
                    <div class="flex mt-2">
                        <button class="text-xs text-indigo-600 hover:text-indigo-800 font-medium mr-3">View Details</button>
                        <button class="text-xs text-gray-500 hover:text-gray-700">Dismiss</button>
                    </div>
                </div>
                <div class="ml-auto text-xs text-gray-500">${
                  notification.time
                }</div>
            </div>
        `;
  });

  notificationContainer.innerHTML = notificationsHTML;
}

function getNotificationIcon(type) {
  switch (type) {
    case "assessment":
      return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>';
    case "job":
      return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>';
    case "course":
      return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>';
    default:
      return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>';
  }
}

// Add window resize event for responsive charts
window.addEventListener("resize", function () {
  const salaryTrendsChart = document.getElementById("salary-trends-chart");
  if (salaryTrendsChart && typeof echarts !== "undefined") {
    const chart = echarts.getInstanceByDom(salaryTrendsChart);
    if (chart) {
      chart.resize();
    }
  }
});

// After the updateGoals function and before getNotificationIcon function

function renderNotifications() {
  return `
        <div class="bg-white rounded-lg shadow p-6 mt-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-800">Notifications</h2>
            </div>
            <div class="space-y-3" id="notifications-list">
                <div class="text-center text-gray-500 py-4">No notifications yet</div>
            </div>
        </div>
    `;
}

function renderGoalTracker() {
  return `
        <div class="bg-white rounded-lg shadow p-6 mt-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-800">Weekly Goals</h2>
            </div>
            <div class="space-y-3">
                <div class="text-center text-gray-500 py-4">Set your first goal to get started</div>
            </div>
        </div>
    `;
}

// Update the fetchJobs function to include randomization
async function fetchJobs() {
  const queries = [
    "software developer",
    "frontend developer",
    "backend developer",
    "full stack developer",
    "software engineer",
    "web developer",
  ];

  const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  const url = "https://jsearch.p.rapidapi.com/search";
//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "13dac02fccmshe90969e3d7b001bp138ac7jsnaa2509384b90",
//       "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
//     },
//   };
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'a05ae14800msh8c856416dcad393p133d2bjsn36bb40bc820e',
		'x-rapidapi-host': 'jsearch.p.rapidapi.com'
	},
};


  try {
    const response = await fetch(
      `${url}?query=${randomQuery}&page=1&num_pages=1`,
      options
    );
    const result = await response.json();
    console.log("Jobs API Response:", result);

    // Shuffle the results if we have any
    if (result.data && result.data.length > 0) {
      return result.data.sort(() => Math.random() - 0.5);
    }
    return result.data || [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

async function renderCareerPaths() {
  try {
    console.log("Starting to render career paths...");

    // Fetch real job listings
    const jobs = await fetchJobs();

    const renderJobSection = (job) => {
      return `
        <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-start">
            <div class="flex-grow">
              <div class="flex items-center gap-2">
                ${
                  job.employer_logo
                    ? `
                  <img src="${job.employer_logo}" alt="${job.employer_name}" class="h-8 w-8 object-contain">
                `
                    : ""
                }
                <h4 class="font-medium text-gray-900">${job.job_title}</h4>
              </div>
              <p class="text-sm font-medium text-indigo-600 mt-1">${
                job.employer_name
              }</p>
              <p class="text-sm text-gray-600 mt-1">${job.job_description?.substring(
                0,
                150
              )}...</p>
              <div class="mt-2 flex flex-wrap gap-2">
                ${
                  job.job_employment_type
                    ? `
                  <span class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">${job.job_employment_type}</span>
                `
                    : ""
                }
                ${
                  job.job_city
                    ? `
                  <span class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">${job.job_city}, ${job.job_country}</span>
                `
                    : ""
                }
                ${
                  job.job_salary
                    ? `
                  <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">${job.job_salary}</span>
                `
                    : ""
                }
              </div>
              <div class="mt-3">
                <a href="${job.job_apply_link}" target="_blank" 
                   class="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                   Apply Now →
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    };

    return `
      <div class="bg-white rounded-lg shadow p-6 dark-mode">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-6 flex justify-between items-center">
          Career Opportunities
         
        </h2>
        <div class="space-y-4">
          ${
            jobs.length > 0
              ? jobs.map((job) => renderJobSection(job)).join("")
              : '<div class="text-center text-gray-500 py-4">Loading job opportunities...</div>'
          }
        </div>
        <div class="mt-4 text-center">
          <a href="/careers" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            View all opportunities →
          </a>
        </div>
      </>
    `;
  } catch (error) {
    console.error("Error rendering career paths:", error);
    return `
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Career Opportunities</h2>
        <div class="text-center py-6 text-red-500">
          <p>Error loading opportunities. Please try again later.</p>
        </div>
      </div>
    `;
  }
}
