document.addEventListener('DOMContentLoaded', function() {
    // Create modal container if it doesn't exist
    if (!document.getElementById('auth-modal-container')) {
        const modalContainer = document.createElement('div');
        modalContainer.id = 'auth-modal-container';
        document.body.appendChild(modalContainer);
    }

    const authModal = {
        show: function(mode = 'signin') {
            const modal = document.getElementById('auth-modal-container');
            modal.innerHTML = `
                <div class="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
                    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                        <div class="flex justify-between items-center p-6 border-b">
                            <h2 class="text-2xl font-bold text-gray-900">
                                ${mode === 'signin' ? 'Sign In' : 'Create Account'}
                            </h2>
                            <button class="text-gray-400 hover:text-gray-500" onclick="authModal.hide()">
                                <i class="ri-close-line ri-lg"></i>
                            </button>
                        </div>
                        
                        <div class="p-6">
                            <form id="auth-form" class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" id="email" required
                                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Password</label>
                                    <input type="password" id="password" required
                                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                                </div>

                                ${mode === 'signup' ? `
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
                                        <input type="password" id="confirm-password" required
                                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                                    </div>
                                ` : ''}
                                
                                <button type="submit" 
                                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                    ${mode === 'signin' ? 'Sign In' : 'Create Account'}
                                </button>
                            </form>

                            <div class="mt-4 text-center">
                                <p class="text-sm text-gray-600">
                                    ${mode === 'signin' 
                                        ? 'Don\'t have an account? <a href="#" class="text-primary hover:text-opacity-90" onclick="authModal.show(\'signup\')">Sign up</a>' 
                                        : 'Already have an account? <a href="#" class="text-primary hover:text-opacity-90" onclick="authModal.show(\'signin\')">Sign in</a>'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Add form submit handler
            document.getElementById('auth-form').addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                try {
                    if (mode === 'signin') {
                        await firebase.auth().signInWithEmailAndPassword(email, password);
                    } else {
                        const confirmPassword = document.getElementById('confirm-password').value;
                        if (password !== confirmPassword) {
                            alert('Passwords do not match');
                            return;
                        }
                        await firebase.auth().createUserWithEmailAndPassword(email, password);
                    }
                    this.hide();
                    window.location.reload();
                } catch (error) {
                    alert(error.message);
                }
            });
        },

        hide: function() {
            const modal = document.getElementById('auth-modal-container');
            modal.innerHTML = '';
        }
    };

    // Make authModal globally available
    window.authModal = authModal;
});