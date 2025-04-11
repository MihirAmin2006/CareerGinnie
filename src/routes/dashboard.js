const express = require('express');
const router = express.Router();
const path = require('path');

// Add logout route
router.get('/logout', (req, res) => {
    res.redirect('/');
});

// Dashboard route with correct path
router.get('/dashboard', (req, res) => {
    console.log('Dashboard route accessed');
    res.sendFile(path.resolve(__dirname, '../../public/views/dashboard/dashboard.html'));
});

// Other dashboard-related routes remain the same
router.get('/skill-assessment', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/views/dashboard/skill-assessment.html'));
});

router.get('/career-match', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/views/dashboard/career-match.html'));
});

router.get('/resume-assistant', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/views/dashboard/resume-assistant.html'));
});

module.exports = router;