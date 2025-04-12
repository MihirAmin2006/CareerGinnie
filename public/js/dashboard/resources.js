document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar
    initResources();
    
    // Setup event listeners
    setupEventListeners();
    
    // Handle logout
    setupLogout();
});

function initResources() {
    // Get container elements
    const sidebarContainer = document.querySelector('.flex.min-h-screen');
    const resourcesContent = document.getElementById('resources-content');
    
    // Insert sidebar before main content
    sidebarContainer.innerHTML = renderSidebar() + renderMobileMenu() + sidebarContainer.innerHTML;
    
    // Render resources content
    resourcesContent.innerHTML = renderResources();
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
    
    // Add event listeners for register buttons
    const registerButtons = document.querySelectorAll('button.bg-indigo-600');
    registerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const webinarTitle = this.closest('.border').querySelector('h4').textContent;
            alert(`Registered for webinar: ${webinarTitle}`);
            // In a real app, this would register the user for the webinar
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