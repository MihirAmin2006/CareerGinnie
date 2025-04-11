document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("navbar-container");

  function renderNav(user) {
    nav.innerHTML = `
            <nav class="bg-white shadow-sm">
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
                            ${
                              user
                                ? `
                                <div class="flex items-center space-x-4">
                                    <span class="text-sm text-gray-700">Welcome, ${user.email}</span>
                                    <button onclick="signOut()" 
                                        class="ml-4 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-opacity-90 rounded-button">
                                        Sign Out
                                    </button>
                                </div>
                            `
                                : `
                                <button onclick="openAuthModal('signin')" 
                                    class="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">Sign In</button>
                                <button onclick="openAuthModal('signup')" 
                                    class="ml-4 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-opacity-90 rounded-button">
                                    Get Started</button>
                            `
                            }
                        </div>
                    </div>
                </div>
            </nav>
        `;
  }

  // Initial render
  renderNav(null);

  // Listen for auth state changes
  firebase.auth().onAuthStateChanged((user) => {
    renderNav(user);
  });
});

function openAuthModal(mode) {
  const modalContainer = document.createElement("div");
  modalContainer.id = "auth-modal";
  modalContainer.innerHTML = `
        <div class="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold text-gray-900">
                        ${mode === "signin" ? "Sign In" : "Create Account"}
                    </h2>
                    <button onclick="closeAuthModal()" class="text-gray-400 hover:text-gray-500">
                        <i class="ri-close-line ri-lg"></i>
                    </button>
                </div>

                <!-- Google Sign In Button -->
                <button onclick="signInWithGoogle()" 
                    class="w-full py-2 px-4 mb-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-center">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                        alt="Google" class="w-5 h-5 mr-2">
                    Continue with Google
                </button>

                <div class="relative my-6">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">Or continue with email</span>
                    </div>
                </div>

                <form id="authForm" onsubmit="handleAuth(event, '${mode}')">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" required
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" id="password" required
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                        </div>
                        ${
                          mode === "signup"
                            ? `
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input type="password" id="confirmPassword" required
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                            </div>
                        `
                            : ""
                        }
                        <button type="submit" 
                            class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90">
                            ${mode === "signin" ? "Sign In" : "Create Account"}
                        </button>
                    </div>
                </form>
                <div class="mt-4 text-center">
                    <p class="text-sm text-gray-600">
                        ${
                          mode === "signin"
                            ? `Don't have an account? <a href="#" onclick="openAuthModal('signup')" class="text-primary hover:text-opacity-90">Sign up</a>`
                            : `Already have an account? <a href="#" onclick="openAuthModal('signin')" class="text-primary hover:text-opacity-90">Sign in</a>`
                        }
                    </p>
                </div>
            </div>
        </div>
    `;
  document.body.appendChild(modalContainer);
}

function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.remove();
}

// Update the Google Sign In function
async function signInWithGoogle() {
  try {
    // Using the compat version of Firebase
    const result = await firebase.auth().signInWithPopup(googleProvider);
    console.log("Google sign-in successful:", result.user);
    closeAuthModal();
  } catch (error) {
    console.error("Google sign-in error:", error);
    if (error.code === "auth/unauthorized-domain") {
      alert("Please access the application through the authorized domain");
    } else {
      alert(error.message);
    }
  }
}

// Update auth state listener
firebase.auth().onAuthStateChanged((user) => {
  renderNav(user);
});

// Update auth functions to use window.auth
async function handleAuth(event, mode) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        if (mode === "signin") {
            // Use the global firebase auth object
            await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log("Login successful, redirecting to dashboard");
            
            // Close the modal first
            closeAuthModal();
            
            // Redirect to dashboard after successful sign in
            window.location.href = '/dashboard';
        } else {
            const confirmPassword = document.getElementById("confirmPassword").value;
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            
            // Close the modal first
            closeAuthModal();
            
            // Redirect to dashboard after successful registration
            window.location.href = '/dashboard';
        }
    } catch (error) {
        console.error("Auth error:", error);
        alert(error.message);
    }
}

function signOut() {
  window.auth
    .signOut()
    .catch((error) => {
      console.error("Sign out error:", error);
    });
}
