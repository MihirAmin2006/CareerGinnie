// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Dark mode toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");

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

// Notification dropdown toggle
const notificationBtn = document.getElementById("notification-btn");
const notificationDropdown = document.getElementById("notification-dropdown");

notificationBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  notificationDropdown.classList.toggle("hidden");
});

// Close notification dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (
    !notificationDropdown.contains(e.target) &&
    e.target !== notificationBtn
  ) {
    notificationDropdown.classList.add("hidden");
  }
});

// Salary trends chart
window.addEventListener("load", function () {
  const salaryTrendsChart = echarts.init(
    document.getElementById("salary-trends-container")
  );

  const option = {
    title: {
      text: "Salary Trends (Last 12 Months)",
      left: "center",
      textStyle: {
        fontSize: 14,
        fontWeight: "normal",
      },
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Full Stack", "Frontend", "Data Science"],
      bottom: 0,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "15%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "${value}k",
      },
    },
    series: [
      {
        name: "Full Stack",
        type: "line",
        data: [98, 100, 102, 104, 105, 105, 107, 108, 110, 112, 115, 118],
        lineStyle: {
          color: "#4f46e5",
        },
        itemStyle: {
          color: "#4f46e5",
        },
      },
      {
        name: "Frontend",
        type: "line",
        data: [90, 92, 93, 94, 95, 95, 96, 97, 98, 99, 100, 102],
        lineStyle: {
          color: "#10b981",
        },
        itemStyle: {
          color: "#10b981",
        },
      },
      {
        name: "Data Science",
        type: "line",
        data: [110, 112, 114, 115, 116, 118, 120, 122, 124, 125, 128, 130],
        lineStyle: {
          color: "#f59e0b",
        },
        itemStyle: {
          color: "#f59e0b",
        },
      },
    ],
  };

  salaryTrendsChart.setOption(option);

  // Responsive chart
  window.addEventListener("resize", function () {
    salaryTrendsChart.resize();
  });
});

// Populate user data (in a real app, this would come from an API)
document.addEventListener("DOMContentLoaded", function () {
  // Example of how you would populate user data from API
  // fetch('/api/user-profile')
  //     .then(response => response.json())
  //     .then(data => {
  //         document.getElementById('user-name').textContent = data.name;
  //         document.getElementById('user-initials').textContent = getInitials(data.name);
  //         document.getElementById('skill-score').textContent = data.skillScore;
  //         // etc.
  //     });

  // For demo purposes, we'll use the hardcoded data
  function getInitials(name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  }
});

// Update the logout handler
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('a[href="/logout"]');
    if (logoutButton) {
        logoutButton.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                console.log('Attempting to sign out...');
                const auth = firebase.auth();
                await auth.signOut();
                console.log('Sign out successful');
                window.location.href = '/';
            } catch (error) {
                console.error('Error signing out:', error);
                alert('Error signing out. Please try again.');
            }
        });
    } else {
        console.error('Logout button not found');
    }
});
