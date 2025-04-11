// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIls2kMn_hJf0i9SRrW1Y9ydm-BGER8bQ",
  authDomain: "career-ginnie-2b65a.firebaseapp.com",
  projectId: "career-ginnie-2b65a",
  storageBucket: "career-ginnie-2b65a.firebasestorage.app",
  messagingSenderId: "629749641046",
  appId: "1:629749641046:web:bf37554714d16b1ac5b0f7",
  measurementId: "G-K8PW72J1Z4"
};

// Initialize Firebase with compat version
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const analytics = firebase.analytics();

// Configure Google provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Make auth and provider available globally
window.auth = auth;
window.googleProvider = googleProvider;