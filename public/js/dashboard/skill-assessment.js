document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar
    initSkillAssessment();
    
    // Setup event listeners
    setupEventListeners();
    
    // Handle logout
    setupLogout();
});

function initSkillAssessment() {
    // Get container elements
    const sidebarContainer = document.querySelector('.flex.min-h-screen');
    
    // Insert sidebar before main content
    sidebarContainer.innerHTML = renderSidebar() + renderMobileMenu() + sidebarContainer.innerHTML;
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
    
    // Assessment buttons
    const assessmentButtons = document.querySelectorAll('.bg-indigo-600');
    assessmentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const assessmentName = this.closest('.border').querySelector('h3').textContent;
            alert(`Starting assessment: ${assessmentName}`);
            // In a real app, this would navigate to the assessment page or open a modal
        });
    });
}

function setupLogout() {
    // Add logout handler
    const logoutLinks = document.querySelectorAll('a[href="/logout"]');
    
    logoutLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await firebase.auth().signOut();
                window.location.href = '/';
            } catch (error) {
                console.error('Error signing out:', error);
            }
        });
    });
}