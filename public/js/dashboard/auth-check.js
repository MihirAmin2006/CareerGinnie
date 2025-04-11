document.addEventListener('DOMContentLoaded', () => {
    // Import Firebase auth if not already available
    if (typeof firebase === 'undefined') {
        console.error('Firebase not loaded');
        return;
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            console.log('User not authenticated, redirecting to login');
            window.location.href = '/login';
        } else {
            console.log('User authenticated:', user.email);
            // Update user information on the dashboard
            updateUserInfo(user);
        }
    });
});

function updateUserInfo(user) {
    // Update user name and initials if elements exist
    const userNameElement = document.getElementById('user-name');
    const userInitialsElement = document.getElementById('user-initials');
    
    if (userNameElement && user.displayName) {
        userNameElement.textContent = user.displayName;
    }
    
    if (userInitialsElement && user.displayName) {
        userInitialsElement.textContent = getInitials(user.displayName);
    }
}

function getInitials(name) {
    return name
        ? name.split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase()
        : 'U';
}