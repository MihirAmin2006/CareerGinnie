const { db } = require('../config/firebase');
const { 
    doc, 
    getDoc, 
    updateDoc, 
    collection,
    query,
    where,
    getDocs 
} = require('firebase/firestore');

const userService = {
    async getUserProfile(userId) {
        try {
            const userDoc = await getDoc(doc(db, 'users', userId));
            return userDoc.exists() ? userDoc.data() : null;
        } catch (error) {
            throw error;
        }
    },

    async updateUserProfile(userId, data) {
        try {
            await updateDoc(doc(db, 'users', userId), {
                ...data,
                updatedAt: new Date()
            });
        } catch (error) {
            throw error;
        }
    },

    async saveUserSkills(userId, skills) {
        try {
            await updateDoc(doc(db, 'users', userId), {
                skills,
                updatedAt: new Date()
            });
        } catch (error) {
            throw error;
        }
    }
};

module.exports = userService;