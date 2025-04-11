// Login form handler
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        // Authenticate with Firebase
        await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log('Login successful, redirecting to dashboard');
        
        // Explicitly redirect to dashboard after successful login
        window.location.href = '/dashboard';
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed: ' + error.message);
    }
}

// Attach event listener to login form
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});