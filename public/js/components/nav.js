document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('main-nav');
    
    function renderNav(user) {
        nav.innerHTML = `
            <div class="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex items-center">
                            <a href="/" class="text-2xl font-['Pacifico'] text-primary">logo</a>
                            <div class="hidden md:ml-10 md:flex md:space-x-8">
                                <a href="#features" class="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">Features</a>
                                <a href="#pricing" class="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">Pricing</a>
                                <a href="#resources" class="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">Resources</a>
                                <a href="#about" class="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">About</a>
                            </div>
                        </div>
                        <div class="flex items-center">
                            ${user ? `
                                <div class="flex items-center space-x-4">
                                    <span class="text-sm text-gray-700">Welcome, ${user.email}</span>
                                    <button onclick="handleSignOut()" 
                                        class="ml-4 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-opacity-90 rounded-button">
                                        Sign Out
                                    </button>
                                </div>
                            ` : `
                                <button onclick="authModal.show('signin')" 
                                    class="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
                                    Sign In
                                </button>
                                <button onclick="authModal.show('signup')" 
                                    class="ml-4 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-opacity-90 rounded-button">
                                    Get Started
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Initial render
    renderNav(null);

    // Listen for auth state changes
    firebase.auth().onAuthStateChanged((user) => {
        renderNav(user);
    });
});

// Sign out handler
function handleSignOut() {
    firebase.auth().signOut().catch((error) => {
        console.error('Sign out error:', error);
    });
}