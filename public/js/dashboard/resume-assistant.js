document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar
    initResumeAssistant();
    
    // Setup event listeners
    setupEventListeners();
    
    // Handle logout
    setupLogout();
});

function initResumeAssistant() {
    // Get container elements
    const sidebarContainer = document.querySelector('.flex.min-h-screen');
    const resumeAssistantContent = document.getElementById('resume-assistant-content');
    
    // Insert sidebar before main content
    sidebarContainer.innerHTML = renderSidebar() + renderMobileMenu() + sidebarContainer.innerHTML;
    
    // Render resume assistant content
    resumeAssistantContent.innerHTML = renderResumeAssistant();
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
    
    // Add event listeners for buttons
    const editResumeButton = document.querySelector('button.bg-indigo-600');
    if (editResumeButton) {
        editResumeButton.addEventListener('click', function() {
            alert('Opening resume editor...');
            // In a real app, this would open the resume editor
        });
    }
    
    // Template selection
    const templateCards = document.querySelectorAll('.cursor-pointer');
    templateCards.forEach(card => {
        card.addEventListener('click', function() {
            const templateName = this.querySelector('p').textContent;
            alert(`Selected template: ${templateName}`);
            // In a real app, this would apply the template
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