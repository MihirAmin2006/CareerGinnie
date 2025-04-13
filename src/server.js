const express = require('express');
const cors = require('cors');
const path = require('path');
// Import routes
const apiRoutes = require('./routes/api');
const dashboardRoutes = require('./routes/dashboard');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API Routes
// Use API routes
app.use('/api', apiRoutes);

// Dashboard routes
app.use('/', dashboardRoutes);

// Root route should serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Catch-all route to handle client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});