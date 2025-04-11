const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const userService = require('../services/userService');

// Auth routes
router.post('/auth/signup', async (req, res) => {
    try {
        const { email, password, ...userData } = req.body;
        const user = await authService.signUp(email, password, userData);
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/auth/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.signIn(email, password);
        res.json({ user });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// User routes
router.get('/user/:userId', async (req, res) => {
    try {
        const profile = await userService.getUserProfile(req.params.userId);
        res.json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/user/:userId', async (req, res) => {
    try {
        await userService.updateUserProfile(req.params.userId, req.body);
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;