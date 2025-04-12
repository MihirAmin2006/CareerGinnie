// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  // Set up theme toggle listeners
  setupThemeToggleListeners();
});

function setupThemeToggleListeners() {
  // Find all theme toggle buttons
  const themeToggles = document.querySelectorAll('[id^="theme-toggle"]');
  
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update UI elements that depend on theme
      updateThemeDependent();
    });
  });
}

function updateThemeDependent() {
  // Update sidebar if it exists
  if (typeof refreshSidebar === 'function') {
    refreshSidebar();
  }
  
  // Update charts if they exist
  if (typeof updateChartTheme === 'function') {
    updateChartTheme();
  }
}