const express = require('express');
const router = express.Router();
const path = require('path');

// Dashboard route
router.get('/dashboard', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/views/dashboard/dashboard.html'));
});

// Skill Assessment route
router.get('/skill-assessment', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/views/dashboard/skill-assessment.html'));
});

// Career Match route
router.get('/career-match', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/views/dashboard/career-match.html'));
});

// Resume Assistant route
router.get('/resume-assistant', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/views/dashboard/resume-assistant.html'));
});

// Resources route
router.get('/resources', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/views/dashboard/resources.html'));
});

// Logout route
router.get('/logout', (req, res) => {
    // In a real app, you might want to clear session data here
    res.redirect('/');
});

module.exports = router;