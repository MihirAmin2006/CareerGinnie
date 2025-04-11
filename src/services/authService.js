const { auth, db } = require('../config/firebase');
const { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} = require('firebase/auth');
const { doc, setDoc } = require('firebase/firestore');

const authService = {
    async signUp(email, password, userData) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                email,
                ...userData,
                createdAt: new Date()
            });
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    },

    async signIn(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    },

    async signOut() {
        try {
            await signOut(auth);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = authService;