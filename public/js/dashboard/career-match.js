document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar
    initCareerMatch();
    
    // Setup event listeners
    setupEventListeners();
    
    // Handle logout
    setupLogout();
});

function initCareerMatch() {
    // Get container elements
    const sidebarContainer = document.querySelector('.flex.min-h-screen');
    const careerMatchContent = document.getElementById('career-match-content');
    
    // Insert sidebar before main content
    sidebarContainer.innerHTML = renderSidebar() + renderMobileMenu() + sidebarContainer.innerHTML;
    
    // Render career match content
    careerMatchContent.innerHTML = renderCareerMatch();
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
    
    // Add event listeners for view details buttons
    const viewDetailsButtons = document.querySelectorAll('button.text-indigo-600');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const careerTitle = this.closest('.border').querySelector('h3').textContent;
            alert(`Viewing details for: ${careerTitle}`);
            // In a real app, this would navigate to the career details page or open a modal
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